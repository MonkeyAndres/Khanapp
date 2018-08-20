const express = require('express');
const router = express.Router();
const controller = require('../../controllers/auth.controller');

router.post("/login", controller.login);

router.post("/logout", controller.logOut);

router.post("/loggedin", controller.loggedIn);

module.exports = router;