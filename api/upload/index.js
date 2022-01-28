const { Router } = require('express');
const multer = require('multer');

const {
  uploadSingleHandler,
  uploadArrayHandler,
} = require('./upload.controller');

const router = Router();
const upload = multer({ dest: './temp' });

router.post('/file', upload.single('file'), uploadSingleHandler);
router.post('/files', upload.any(), uploadArrayHandler);

module.exports = router;
