const {
  createReserve,
  deleteReserve,
  getAllReserves,
  getReserveById,
  updateReserve
} = require('./reserve.service')

async function getAllReservesHandler(req, res) {
  try {
    const reserves = await getAllReserves();
    return res.status(200).json(reserves)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function getReserveByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const Reserve = await getReserveById(id);

    if (!Reserve) {
      return res.status(404).json({ message: `Reserve not found with id: ${id}` });
    }

    return res.status(200).json(Reserve);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createReserveHandler(req, res) {
  try {
    const Reserve = await createReserve(req.body);
    return res.status(201).json(Reserve);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateReserveHandler(req, res) {
  const { id } = req.params;
  try {
    const Reserve = await updateReserve(id, req.body);

    if (!Reserve) {
      return res.status(404).json({ message: `Reserve not found with id: ${id}` });
    }

    return res.status(200).json(Reserve);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteReserveHandler(req, res) {
  const { id } = req.params;
  try {
    const Reserve = await deleteReserve(id);

    if (!Reserve) {
      return res.status(404).json({ message: `Reserve not found with id: ${id}` });
    }

    return res.status(200).json(Reserve);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createReserveHandler,
  deleteReserveHandler,
  getAllReservesHandler,
  getReserveByIdHandler,
  updateReserveHandler,
};
