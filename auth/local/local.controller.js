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

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Email or password is incorrect',
      });
    }

    const token = signToken(user.profile);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

async function changePasswordHandler(req, res) {}

module.exports = {
  loginUserHandler,
  changePasswordHandler,
};
