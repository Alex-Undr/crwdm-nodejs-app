const Router = require('express').Router();
const controller = require('../controllers/servers');
const authController = require('../controllers/authController');
const uploadFilesController = require('../controllers/uploadFilesController');

const router = Router;
const getAll = controller;


router.post('/api/server', getAll);
router.post('/api/login', authController.login);
router.post('/api/upload-files', uploadFilesController.uploadFiles);


module.exports = router;

