const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applications: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
        // required: true,
    },
},{
    timestamps: true,
})

const Job =  mongoose.model("JOB", jobSchema)
module.exports = Job;