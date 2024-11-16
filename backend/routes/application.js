const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');
const isAuthenticate = require('../middlewares/isAuthenticated');

router.post('/apply/:id', isAuthenticate, applicationController.applyJob);
router.get('/:id/applicants', isAuthenticate, applicationController.getApplicants)
router.get('/get', isAuthenticate, applicationController.getAppliedJobs)
router.post('/status/:id/update', isAuthenticate, applicationController.updateStatus)

module.exports = router;