const User = require('../model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const getDataUri = require('../utils/dataUri');
const cloudinary = require('../utils/cloudinary');

const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "something is missing" });
        }

        const file = req.file;
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        })

        return res.status(201).json({ message: "User created" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Missing fields" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Role mismatch" });
        }

        const tokenData = {
            userId: user._id
        };

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userResponse = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,  // Use httpOnly to prevent client-side access
                sameSite: "Strict" // Correct option name
            })
            .json({
                success: true,
                message: "Login successful",
                user: userResponse,
            });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "logged out", success: true })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, role, skills } = req.body;
        const file = req.file; // If you're handling file uploads, ensure you manage it accordingly
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Validate required fields
        // if (!fullName || !email || !phoneNumber || !role || !skills) {
        //     return res.status(400).json({ message: "All fields are required" });
        // }

        const skillsArray = skills ? skills.split(",") : []; // Trim skills

        const userId = req.id; // Ensure that req.id is set correctly, possibly from middleware

        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Updating user data
        user.fullName = fullName;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.role = role;
        user.skillsArray = skillsArray; // Assuming skillsArray is a field in your User model

        // If you're handling file uploads, you might want to include logic here to manage the file
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.OriginalName
        }
        await user.save();

        // Create a response object
        const updatedUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            skillsArray: user.skillsArray, // Include the updated skills
        };

        return res.status(200).json({ message: "Profile updated successfully", success: true, user: updatedUser });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    register,
    login,
    logout,
    updateProfile
}