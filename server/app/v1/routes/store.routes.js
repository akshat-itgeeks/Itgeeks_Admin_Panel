const express = require("express");
const controllers = require("../controllers/store.controller.js");
const router = express.Router();
const validation = require("../validations/store.validation.js");
const authValidation = require("../validations/auth.validation.js");
const auth = require('../middleware/authentication.js');


router.post('/', auth.authenticate, validation.addStore, controllers.addStore);
router.post('/list', authValidation.list, controllers.storeList);
router.get('/:id', authValidation.id, controllers.storeById);
router.put('/:id', authValidation.id, validation.addStore, controllers.storeUpdate);
router.delete('/:id', authValidation.id, controllers.storeDelete);

module.exports = router;
