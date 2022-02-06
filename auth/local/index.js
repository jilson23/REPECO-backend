const { Router } = require('express');

const {
  loginUserHandler,
  changePasswordHandler,
  verifyAccount,
} = require('./local.controller');

const router = Router();

// /auth/local/login
// /auth/local/forgot-password

router.post('/login', loginUserHandler);
// router.post('/forgot-password', (req, res) => {});
router.post('/change-password', changePasswordHandler);
router.post('/confirm-account/:hash', verifyAccount);

module.exports = router;
