const epayco = require('epayco-sdk-node')({
  apiKey: 'e7943140d6dee92d4922b5939bb7b994',
  privateKey: '50af1e81236bd26619eda78fc7bb2c6b',
  lang: 'ES',
  test: true
})

async function createCardToken(req, res) {
  try {
    const data = await epayco.token.create(req.body);
    res.status(200).send({
      data: data
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error al crear el token',
      error,
    })
  }
}

async function createCustomer(req, res) {
  try {
    const data = await epayco.customers.create(req.body)
    res.status(200).send({
      data: data
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error al crear el customer',
      error,
    })
  }
}

async function createPayment(req, res) {
  try {
    const data = await epayco.charge.create(req.body)
    res.status(200).send({
      data: data
    })
  } catch (error) {
    res.status(500).send({
      message: 'Error al crear el pago',
      error,
    })
  }
}

module.exports = {
  createCardToken,
  createCustomer,
  createPayment
};
