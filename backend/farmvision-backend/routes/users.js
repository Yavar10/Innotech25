const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/', userController.getAllUsers);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.put('/:userId/password', userController.changePassword);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
