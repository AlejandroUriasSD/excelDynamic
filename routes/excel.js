const express = require("express");
const router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var excelController = require("../controllers/excelController");



router.post("/post",
    upload.fields([{ name: "files", maxCount: 10 },
    { name: "document", maxCount: 10 }]), excelController.insertExcelFile);

module.exports = router;