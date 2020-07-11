const express = require("express");
const router = express.Router();
const authenticateController = require("../controllers/authenticateController")


router.post("/login", authenticateController.authenticate);

module.exports = router;