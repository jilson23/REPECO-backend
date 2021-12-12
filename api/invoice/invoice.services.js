const Invoice = require('./invoice.model');

/**
 * Get all invoices
 * @returns all invoices
 */ 

async function getAllInvoices() {
    try {
      const invoices = await Invoice.find();
      return invoices;
    } catch (error) {
      throw error;
    }
}

/**
 * Get invoice by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns invoice
*/
async function getInvoiceById(id) {
  try {
    const invoice = await Invoice.findById(id);
    return invoice;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new invoice
 * @param {Object} invoice Invoice to create
 * @returns Invoice created
 */
 async function createInvoice(invoice) {
  try {
    const newInvoice = new Invoice(invoice);
    const savedInvoice = await newInvoice.save();
    return savedInvoice;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a invoice
 * @param {string} id Indentifier of the invoice to be updated
 * @param {*} invoice Body of the invoice to be updated
 * @returns invoice updated
 */
 async function updateInvoice(id, invoice) {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, invoice);
    return updatedInvoice;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a invoice
 * @param {String} id Identifier of the invoice to be deleted
 * @returns Invoice deleted
 */
async function deleteInvoice(id) {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(id);
    return deletedInvoice;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
};
