const express = require("express");
const controllers = require("../controllers/auth.controller.js");
const router = express.Router();
// const customerValidation = require("../validations/customerValidation.js");

router.post('/login', controllers.login);

module.exports = router;
