const Job = require('../model/job');

const postJob = async (req, res) => {
    try {
        const { title, description, requirements, experience, salary, location, jobType, position, companyId } = req.body;
        const userId = req.user?._id;

        if (!title || !description || !requirements || !experience || !salary || !location || !jobType || !position || !companyId) {
            return res.status(404).json({ message: "Fields cannot be empty" });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            experience,
            salary: Number(salary),
            location,
            jobType,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(201).json({ message: "job created successfully", job, success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(401).json({ message: "not found" });
        }

        return res.status(200).json({ message: "job fetched successfully", jobs, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getjobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(401).json({ message: "not found" });
        }

        return res.status(201).json({ message: "job fetched successfully", job, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getAdminJob = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1,
        });

        if (!jobs) {
            return res.status(401).json({ message: "not found" });
        }

        return res.status(201).json({ message: "job fetched successfully", jobs, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    postJob,
    getAllJob,
    getjobById,
    getAdminJob
}