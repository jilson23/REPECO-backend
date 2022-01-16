const Invoice = require('./invoice.model');

/**
 * Get all invoices
 * @returns all invoices
 */

async function getAllInvoices() {
  const invoices = await Invoice.find();
  return invoices;
}

/**
 * Get invoice by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns invoice
*/
async function getInvoiceById(id) {
  const invoice = await Invoice.findById(id);
  return invoice;
}

/**
 * Create a new invoice
 * @param {Object} invoice Invoice to create
 * @returns Invoice created
 */
async function createInvoice(invoice) {
  const newInvoice = new Invoice(invoice);
  const savedInvoice = await newInvoice.save();
  return savedInvoice;
}

/**
 * Update a invoice
 * @param {string} id Indentifier of the invoice to be updated
 * @param {*} invoice Body of the invoice to be updated
 * @returns invoice updated
 */
async function updateInvoice(id, invoice) {
  const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice);
  return updatedInvoice;
}

/**
 * Delete a invoice
 * @param {String} id Identifier of the invoice to be deleted
 * @returns Invoice deleted
 */
async function deleteInvoice(id) {
  const deletedInvoice = await Invoice.findByIdAndDelete(id);
  return deletedInvoice;
}

module.exports = {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
};
