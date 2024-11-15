const Company = require('../model/company');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary');

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Validate that the company name is provided
        if (!companyName) {
            return res.status(400).json({ message: "Company name is required" });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ message: "You can't register the same company again" });
        }
        console.log("User ID:", req.id);
        // Create a new company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({ message: "Company registered successfully", company, success: true });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error", error });
    }
};

const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId })

        if (!companies) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({ message: "Company found successfully", companies , success: true});
    } catch (error) {
        return res.status(500).json({ message: "Intrnal server error" });
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({ message: "Company found successfully", company, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Intrnal server error" });
    }
}

const updateCompany = async () => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        return res.status(200).json({ message: "Company updated successfully", company, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Intrnal server error" });
    }
}

module.exports = {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
};