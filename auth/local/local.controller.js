const { findOneUser } = require('../../api/user/user.service');
const { signToken } = require('../auth.service');

async function loginUserHandler(req, res) {
  const { email, password } = req.body;
  try {
    const user = await findOneUser({ email });

    if (!user) {
      return res.status(404).json({
        message: 'Email or password is incorrect',
      });
    }

    // if (!user.active) {
    //   return res.status(403).json({
    //     message: 'Please confirm your email',
    //   });
    // }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Email or password is incorrect',
      });
    }

    const token = signToken(user.profile);

    res.status(200).json({ token });
  } catch (err) {
    console.log('error en la consola')
    res.status(400).json(err);
    console.log('email', email)
    console.log('password', password)
  }
}

async function changePasswordHandler(req, res) {}

async function verifyAccount(req, res) {
  const { hash } = req.params;
  // console.log('hast verify', hash);
  try {
    const user = await findOneUser({ passwordResetToken: hash });
    if (!user) {
      return res.status(404).json({
        message: 'Invalid token'
      })
    }

    if (Date.now() > user.passwordResetExpires) {
      return res.status(404).json({
        message: 'Token expired',
      })
    }

    user.active = true;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    const token = signToken(user.profile);
    res.status(200).json({ token });
    // return res.status(200).json({
    //   message: 'Account verified'
    // });
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = {
  loginUserHandler,
  verifyAccount,
  changePasswordHandler,
};
