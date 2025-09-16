const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const fileImportController = require('../controllers/fileImportController');

router.post('/preview', upload.single('file'), fileImportController.previewFile);
router.post('/upload', upload.single('file'), fileImportController.uploadFile);

module.exports = router;
