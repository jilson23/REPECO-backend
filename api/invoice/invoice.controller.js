const Invoice = require('./invoice.model');

const {
  addBillingCards,
  addBillingCustomerId,
  getUserById
} = require('../user/user.service');

const {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  createCardToken,
  createCustomer,
  makePayment,
  getInvoicesByUser,
  getInvoiceByIdAndUser
} = require('./invoice.service');
const { get } = require('lodash');

async function getInvoicesByUserId(req, res) {
  const id = req.user._id;
  try {
    const invoices = await getInvoicesByUser(id);
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

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

async function getInvoiceUserById(req, res) {
  const user = req.user;
  const { id } = req.params;
  try {
    const invoice = await getInvoiceByIdAndUser(id, user._id)
    if (!invoice) {
      return res.status(404).json({ message: `Invoice not found with id: ${id}` });
    }

    return res.status(200).json(invoice);
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
    const defaultTokenId = get(user, `billing.creditCards[${invoice.cardIndex}].tokenId`, false);
    const customerId = get(user, 'billing.customerId', false);

    if (!defaultTokenId) {
      const { cardNumber, cardExpYear, cardExpMonth, cardCVC } = invoice;
      const creditInfo = {
        'card[number]': cardNumber,
        'card[exp_year]': cardExpYear,
        'card[exp_month]': cardExpMonth,
        'card[cvc]': cardCVC,
      };

      const { card, id } = await createCardToken(creditInfo);

      const creditCard = {
        expMonth: card.exp_month,
        expYear: card.exp_year,
        name: invoice.name,
        docType: invoice.docType,
        docNumber: invoice.docNumber,
        mask: card.mask,
        tokenId: id,
      };

      const updatedUser = await addBillingCards(user, creditCard);

      if (!customerId) {
        const { data } = await createCustomer(updatedUser, invoice.cardIndex);
        console.log(data)
        await addBillingCustomerId(updatedUser, data.customerId);
      }
    }

    const userPayment = await getUserById(user._id)

    const invoices = await getAllInvoices();

    const maxInvoiceId = Math.max.apply(Math, invoices.map(function(i) { return i.invoiceNumber; }))
    const newInvoiceId = maxInvoiceId + 1;

    invoice.bill = newInvoiceId;

    const { data, success } = await makePayment(userPayment, invoice);

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
  makePaymentHandlers,
  getInvoicesByUserId,
  getInvoiceUserById
};
