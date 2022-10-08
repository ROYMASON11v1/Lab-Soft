const express = require('express');
const router = express.Router();
const seeUser = require("../controllers/users.controller.js");

/* GET users listing. */
router.get('/', seeUser);

module.exports = router;
