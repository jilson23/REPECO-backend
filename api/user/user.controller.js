const { 
    createUser, 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    updateUser 
  } = require('./user.service')
  
  async function getAllUsersHandler(req, res){
    try {
      const users = await getAllUsers();
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
  
  
  async function getUserByIdHandler(req, res) {
    const { id } = req.params;
    try {
      const User = await getUserById(id);
  
      if (!User) {
        return res.status(404).json({ message: `User not found with id: ${id}` });
      }
  
      return res.status(200).json(User);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async function createUserHandler(req, res) {
    try {
      const User = await createUser(req.body);
      return res.status(201).json(User);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async function updateUserHandler(req, res) {
    const { id } = req.params;
    try {
      const User = await updateUser(id, req.body);
  
      if (!User) {
        return res.status(404).json({ message: `User not found with id: ${id}` });
      }
  
      return res.status(200).json(User);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async function deleteUserHandler(req, res) {
    const { id } = req.params;
    try {
      const User = await deleteUser(id);
  
      if (!User) {
        return res.status(404).json({ message: `User not found with id: ${id}` });
      }
  
      return res.status(200).json(User);
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
  };
  