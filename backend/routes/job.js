const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job');

router.post('/post', jobController.postJob);
router.get('/get', jobController.getAllJob)
router.get('/get/:id', jobController.getjobById)
router.get('/getadminjobs', jobController.getAdminJob)


module.exports = router;