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

        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 })
            .populate({
                path: "job", options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } },
                }
            })

        return res.status(200).json({ message: "data fetched successfully", application });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

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

        return res.status(200).json({ message: "data fetched successfully", job });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
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

        return res.status(200).json({ message: "updated successfully", applications });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    applyJob,
    getAppliedJobs,
    getApplicants,
    updateStatus
}