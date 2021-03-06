const { Router } = require('express');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateUserCartHandler,
  getUserCartHandler,
  deleteItemCartHandler,
  deleteCartHandler,
  deleteSelfUser
} = require('./user.controller');

const { UserSchema } = require('./user.schema')
const validateRequest = require('../../middleware/validateRequest');
const { hasRole, isAuthenticated } = require('../../auth/auth.service')

const router = Router();

router.get('/',
// hasRole(['admin']),
  getAllUsersHandler);
router.post('/',
  // hasRole(['admin']),
  validateRequest(UserSchema, 'body'),
  createUserHandler
);
router.get('/cart/', isAuthenticated(), getUserCartHandler);
router.delete('/cart', isAuthenticated(), deleteCartHandler);
router.patch('/profile', isAuthenticated(), updateUserHandler);
router.patch('/cartitem', isAuthenticated(), deleteItemCartHandler);
router.get('/profile', isAuthenticated(), getUserByIdHandler);
router.delete('/delete', isAuthenticated(), deleteSelfUser);
router.delete('/:id', hasRole(['admin']), deleteUserHandler);
router.patch('/cart/:id', isAuthenticated(), updateUserCartHandler);

module.exports = router;
