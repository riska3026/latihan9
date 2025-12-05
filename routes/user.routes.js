const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authBearer } = require('../middlewares/auth.middleware');

// GET semua user
router.get('/', authBearer, userController.getAllUsers);

// GET user berdasarkan ID
router.get('/:id', authBearer, userController.getUserById);

// CREATE user baru
router.post('/', authBearer, userController.createUser);

// UPDATE user
router.put('/:id', authBearer, userController.updateUser);

// DELETE user
router.delete('/:id', authBearer, userController.deleteUser);

module.exports = router;