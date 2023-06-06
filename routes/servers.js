const Router = require('express').Router();
const controller = require('../controllers/servers');
const authController = require('../controllers/authController');
const uploadFilesController = require('../controllers/uploadFilesController');
const downloadFilesController = require('../controllers/downloadFilesController');

const router = Router;
const getAll = controller;


router.post('/api/server', getAll);
router.post('/api/login', authController.login);
router.post('/api/upload-files', uploadFilesController.uploadFiles);
router.post('/api/dwnld-files', downloadFilesController.downloadFiles);


module.exports = router;

