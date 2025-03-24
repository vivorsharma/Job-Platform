const Application = require('../model/application');
const Job = require('../model/job');

const applyJob = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User is not authenticated" });
        }
        const userId = req.user._id;
        const jobId = req.params.id;

        if (!userId || !jobId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingApplication = await Application.findOne({ job: jobId, application: userId });

        if (existingApplication) {
            return res.status(400).json({ message: "Already applied" });
        }


        const newApplication = await Application.create({
            job: jobId,
            application: userId
        });


        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Ensure `applications` is initialized as an array
        if (!Array.isArray(job.applications)) {
            job.applications = [];
        }


        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({ success: true, message: "Applied successfully", job });

    } catch (error) {
        console.error('Error during job application process:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        console.log("User ID:", userId);  

        // Query to find applications for the user
        const application = await Application.find({ application: userId }).sort({ createdAt: -1 });
        console.log("Fetched Applications:", application);  

        if (application.length === 0) {
            return res.status(404).json({ message: "No applications found", success: false });
        }

        // Log before populating the job and company
        console.log("Before populating job and company fields...");

        // Populate the job and company details
        const populatedApplications = await Application.find({ application: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "Job", options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    model: "Company",
                    options: { sort: { createdAt: -1 } },
                },
                strictPopulate: false,
            });

        console.log("Populated Applications:", populatedApplications);  

        if (populatedApplications.length === 0) {
            return res.status(404).json({ message: "No populated applications found", success: false });
        }

        return res.status(200).json({
            message: "Data fetched successfully",
            success: true,
            application: populatedApplications
        });

    } catch (error) {
        console.error("Error fetching applications:", error);  
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


const getApplicants = async (req, res) => {
    try {
        const { jobId } = req.params.id;

        const job = await Job.findById({ jobId }).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicants"
            }
        });

        if (!job) {
            return res.status(401).json({ message: "not found" });
        }

        return res.status(200).json({ message: "data fetched successfully", success: true, job });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(401).json({ message: "status is required" });
        }

        const applications = await Application.findOne({ _id: applicationId })

        if (!applications) {
            return res.status(401).json({ message: "not found" });
        }

        applications.status = status.toLowerCase();
        await applications.save();

        return res.status(200).json({ message: "updated successfully", success: true, applications });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false, });
    }
}

module.exports = {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
}