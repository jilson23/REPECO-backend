const {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice
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

module.exports = {
  createInvoiceHandler,
  deleteInvoiceHandler,
  getAllInvoicesHandler,
  getInvoiceByIdHandler,
  updateInvoiceHandler,
};
