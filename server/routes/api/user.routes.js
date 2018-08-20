const express = require('express');
const controller = require('../../controllers/user.controller')

const loggedIn = require('../../middleware/loggedIn');
const upload = require('../../config/cloudinary');

const router = express.Router();

router.get('/:username', loggedIn, controller.getUserByUsername);

router.post('/', controller.saveUser.bind(controller));

router.put('/', [loggedIn, upload.single('file')], controller.editUser);

router.delete('/', loggedIn, controller.deleteUser);


module.exports = router;