const express = require('express')
const router = express.Router();
const userController = require('../controllers/user');
const isAuthenticated = require('../middlewares/isAuthenticated');
const singleUpload  = require('../middlewares/multer');

router.post('/register', singleUpload, userController.register);
router.post('/login', userController.login);
router.post('/logout', isAuthenticated,userController.logout);
router.post('/profile/update',isAuthenticated, singleUpload, userController.updateProfile);

module.exports = router;