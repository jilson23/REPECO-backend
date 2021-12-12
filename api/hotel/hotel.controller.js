const { 
    createHotel, 
    deleteHotel, 
    getAllHotels, 
    getHotelById, 
    updateHotel 
  } = require('./hotel.service')
  
  async function getAllHotelsHandler(req, res){
    try {
      const hotels = await getAllHotels();
      return res.status(200).json(hotels)
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
  }
  
  
  async function getHotelByIdHandler(req, res) {
    const { id } = req.params;
    try {
      const Hotel = await getHotelById(id);
  
      if (!Hotel) {
        return res.status(404).json({ message: `Hotel not found with id: ${id}` });
      }
  
      return res.status(200).json(Hotel);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async function createHotelHandler(req, res) {
    try {
      const Hotel = await createHotel(req.body);
      return res.status(201).json(Hotel);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async function updateHotelHandler(req, res) {
    const { id } = req.params;
    try {
      const Hotel = await updateHotel(id, req.body);
  
      if (!Hotel) {
        return res.status(404).json({ message: `Hotel not found with id: ${id}` });
      }
  
      return res.status(200).json(Hotel);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  async function deleteHotelHandler(req, res) {
    const { id } = req.params;
    try {
      const Hotel = await deleteHotel(id);
  
      if (!Hotel) {
        return res.status(404).json({ message: `Hotel not found with id: ${id}` });
      }
  
      return res.status(200).json(Hotel);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    createHotelHandler,
    deleteHotelHandler,
    getAllHotelsHandler,
    getHotelByIdHandler,
    updateHotelHandler,
  };
  