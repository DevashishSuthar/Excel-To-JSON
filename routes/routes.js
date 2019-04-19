const express = require('express');
const router = express.Router();

const controller = require('../controller/controller');

router.post('/excel-sheet-upload', controller.excelSheetUpload);

module.exports = router;