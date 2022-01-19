const Invoice = require('./invoice.model');

const {
  addBillingCards,
  addBillingCustomerId
} = require('../user/user.service');

const {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  createCardToken,
  createCustomer,
  makePayment
} = require('./invoice.service')

async function getAllInvoicesHandler(req, res) {
  try {
    const invoices = await getAllInvoices();
    return res.status(200).json(invoices)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

async function getInvoiceByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const Invoice = await getInvoiceById(id);

    if (!Invoice) {
      return res.status(404).json({ message: `Invoice not found with id: ${id}` });
    }

    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createInvoiceHandler(req, res) {
  const userId = req.user._id;
  const invoice = req.body

  invoice.user = userId;
  try {
    const invoices = await getAllInvoices();

    const maxInvoiceId = Math.max.apply(Math, invoices.map(function(i) { return i.invoiceNumber; }))
    invoice.invoiceNumber = maxInvoiceId + 1;

    const newInvoice = await createInvoice(req.body);
    return res.status(201).json(newInvoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateInvoiceHandler(req, res) {
  const { id } = req.params;
  try {
    const Invoice = await updateInvoice(id, req.body);

    if (!Invoice) {
      return res.status(404).json({ message: `Invoice not found with id: ${id}` });
    }

    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteInvoiceHandler(req, res) {
  const { id } = req.params;
  try {
    const Invoice = await deleteInvoice(id);

    if (!Invoice) {
      return res.status(404).json({ message: `Invoice not found with id: ${id}` });
    }

    return res.status(200).json(Invoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createCardTokenHandlers(req, res) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCVC } = req.body;

  const creditInfo = {
    'card[number]': cardNumber,
    'card[exp_year]': cardExpYear,
    'card[exp_month]': cardExpMonth,
    'card[cvc]': cardCVC,
  };

  try {
    const { card, id, status } = await createCardToken(creditInfo);

    const user = req.user;

    const creditCard = {
      expMonth: card.exp_month,
      expYear: card.exp_year,
      name: card.name,
      mask: card.mask,
      tokenId: id,
    };

    await addBillingCards(user, creditCard);

    res.status(200).json({ card, id, status });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error al crear el token',
      error,
    });
  }
}

async function createCustomerHandlers(req, res) {
  const user = req.user;

  try {
    const { data } = await createCustomer(user);

    await addBillingCustomerId(user, data.customerId);

    res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error al crear el token',
      error,
    });
  }
}

async function makePaymentHandlers(req, res) {
  try {
    const { user, body: invoice } = req;

    const invoices = await getAllInvoices();

    const maxInvoiceId = Math.max.apply(Math, invoices.map(function(i) { return i.invoiceNumber; }))
    const newInvoiceId = maxInvoiceId + 1;

    invoice.bill = newInvoiceId;

    const { data, success } = await makePayment(user, invoice);

    if (!success) {
      return res.status(400).json(data);
    }

    await Invoice.create({
      user: user._id,
      rooms: invoice.rooms,
      refId: data.recibo,
      bill: invoice.bill,
      description: invoice.description,
      value: invoice.value,
      tax: invoice?.tax,
      taxBase: invoice?.taxBase,
      invoiceNumber: Number(invoice.bill),
    });

    return res.status(200).json({ success, data });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error realizando el pago',
      error,
    });
  }
}

module.exports = {
  createInvoiceHandler,
  deleteInvoiceHandler,
  getAllInvoicesHandler,
  getInvoiceByIdHandler,
  updateInvoiceHandler,
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers
};
