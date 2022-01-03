const { Router } = require('express');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateUserCartHandler,
  getUserCartHandler
} = require('./user.controller');

const { UserSchema } = require('./user.schema')
const validateRequest = require('../../middleware/validateRequest');
const { hasRole, isAuthenticated } = require('../../auth/auth.service')

const router = Router();

router.get('/', hasRole(['admin']), getAllUsersHandler);
router.post('/',
  hasRole(['admin']),
  validateRequest(UserSchema, 'body'),
  createUserHandler
);
router.get('/cart/', isAuthenticated(), getUserCartHandler);
router.get('/:id', isAuthenticated(), getUserByIdHandler);
router.delete('/:id', hasRole(['admin']), deleteUserHandler);
router.patch('/:id', isAuthenticated(), updateUserHandler);
router.patch('/cart/:id', isAuthenticated(), updateUserCartHandler);

module.exports = router;
