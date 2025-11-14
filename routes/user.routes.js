const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET semua user
router.get('/', userController.getAllUsers);

// GET user berdasarkan ID
router.get('/:id', userController.getUserById);

// CREATE user baru
router.post('/', userController.createUser);

// UPDATE user
router.put('/:id', userController.updateUser);

// DELETE user
router.delete('/:id', userController.deleteUser);

module.exports = router;