const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

router.post('/apply/:id', applicationController.applyJob);
router.get('/:id/applicants', applicationController.getApplicants)
router.get('/get', applicationController.getAppliedJobs)
router.post('/status/:id/update', applicationController.updateStatus)

module.exports = router;