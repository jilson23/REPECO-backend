const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  findOneUser
} = require('./user.service')

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createUserHandler(req, res) {
  try {
    const userExists = await findOneUser({ email: req.body.email })
    if (userExists) {
      return res.status(409).json({ error: 'user already exists' })
    }
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await updateUser(id, req.body);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUserCartHandler(req, res) {
  const { id } = req.params; // RoomId
  const userId = req.user;

  try {
    const user = await updateUser(userId, req.body);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  updateUserCartHandler
};
