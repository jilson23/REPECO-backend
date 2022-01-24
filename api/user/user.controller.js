const crypto = require('crypto');

const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  findOneUser
} = require('./user.service')
const { sendEmail } = require('../../utils/email');

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

async function getUserByIdHandler(req, res) {
  const id = req.user._id;
  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: `User not found with id: ${id}`
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

async function getUserCartHandler(req, res) {
  const {
    email
  } = req.user;
  try {
    const user = await findOneUser({
      email
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found '
      });
    }
    console.log(user.cart)
    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

async function createUserHandler(req, res) {
  const newUser = req.body;
  try {
    // const userExists = await findOneUser({
    //   email: req.body.email
    // })
    // if (userExists) {
    //   return res.status(409).json({
    //     error: 'user already exists'
    //   })
    // }

    const hash = crypto.createHash('sha256').update(newUser.email).digest('hex');
    newUser.passwordResetToken = hash;
    newUser.passwordResetExpires = Date.now() + 3600000 * 24;// 24 hour

    const user = await createUser(newUser);

    const email = {
      to: user.email,
      subject: 'Confirm account',
      template_id: 'd-97aa84e5f39e4a908f90bfedee154960',
      dynamic_template_data: {
        url: 'http://localhost:3000/user/activate/' + hash,
        email: user.email
      }
    }

    sendEmail(email)

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

async function updateUserHandler(req, res) {
  const id = req.user._id;
  try {
    const user = await updateUser(id, req.body);
    if (!user) {
      return res.status(404).json({
        message: `User not found with id: ${id}`
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

async function updateUserCartHandler(req, res) {
  const {
    id
  } = req.params; // RoomId
  const userId = req.user;
  const { checkIn, checkOut } = req.body;
  try {
    const user = await getUserById(userId);

    if (user.cart.find(c => c.room.toString() === id)) {
      return res.status(202).json({ message: 'The room is already added' })
    }
    user.cart.push({ room: id, checkIn, checkOut })

    const updatedUser = await updateUser(userId, user);

    if (!updatedUser) {
      return res.status(404).json({
        message: `User not found with id: ${id}`
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

async function deleteCartHandler(req, res) {
  const userId = req.user;

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: `User not found with id: ${userId}`
      });
    }
    user.cart = []

    const updatedUser = await updateUser(userId, user);

    if (!updatedUser) {
      return res.status(404).json({
        message: `User not found with id: ${userId}`
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

async function deleteItemCartHandler(req, res) {
  const userId = req.user;
  const { room } = req.body;
  try {
    const user = await getUserById(userId);

    const newUserCart = user.cart.filter(c => c.room.toString() !== room)

    user.cart = newUserCart

    const updatedUser = await updateUser(userId, user);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found ' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  const {
    id
  } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: `User not found with id: ${id}`
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateUserCartHandler,
  getUserCartHandler,
  deleteItemCartHandler,
  deleteCartHandler,
};
