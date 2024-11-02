const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company')
const isAuthenticated = require('../middlewares/isAuthenticated');
const singleUpload = require('../middlewares/multer');

router.post('/register', isAuthenticated, companyController.registerCompany)
router.get('/get',isAuthenticated, companyController.getCompany)
router.get('/get/:id', isAuthenticated,companyController.getCompanyById)
router.post('/update/:id',isAuthenticated, singleUpload, companyController.updateCompany)


module.exports = router;