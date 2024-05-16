const express = require("express");
const controllers = require("../controllers/auth.controller.js");
const router = express.Router();
const validation = require("../validations/auth.validation.js");

router.post('/login', validation.login, controllers.login);
router.post('/register', validation.register, controllers.register);

module.exports = router;
