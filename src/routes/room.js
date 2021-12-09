const express = require('express');
const roomSchema = require('../models/room');

const router = express.Router();

// create room
router.post('/rooms', async(req, res) => {
  try {
    const roomToAdd = new roomSchema(req.body);
    const roomSaved =  await roomToAdd.save();
    res.status(201).json(roomSaved)
  } catch (error) {
    res.json({ message: error })
  }
    
})

// get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const roomsFromBd = await roomSchema.find({});

    res.json(roomsFromBd);
  } catch (error) {
    res.json({ message: error })
  }
})

// get a room
router.get('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const roomFromBd = await roomSchema.findById(id);

    res.json(roomFromBd)
  } catch (error) {
    res.json({ message: error });
  }    
})

// update a room
router.put('/rooms/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description, images, address, tags, price } = req.body;

    const roomToUpdate = await roomSchema.updateOne({ _id: id},{ $set: { type, title, description, images, address, tags, price }});

    res.json(roomToUpdate)
  } catch (error) {
    res.json({ message: error })
  }    
})

// delete a room
router.delete('/rooms/:id,', async(req, res) => {
  try {
    const { id, } = req.params;

    const roomToDelete = await roomSchema.remove({ _id: id, });

    res.json(roomToDelete)
  } catch (error) {
    res.json({ message: error })
  }    
})


module.exports = router;