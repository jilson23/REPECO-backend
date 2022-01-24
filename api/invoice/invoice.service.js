const epayco = require('epayco-sdk-node')({
  apiKey: process.env.EPAYCO_PUBLIC_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});

const get = require('lodash/get');

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

async function createCardToken(creditCardInfo) {
  return await epayco.token.create(creditCardInfo);
}

async function createCustomer(user) {
  const customerInfo = {
    token_card: user?.billing?.creditCards?.[0]?.tokenId,
    name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    default: true
  }

  return epayco.customers.create(customerInfo);
}

async function makePayment(user, invoice) {
  const defaultTokenId = get(user, 'billing.creditCards[0].tokenId');
  const customerId = get(user, 'billing.customerId');

  const paymentInfo = {
    token_card: get(invoice, 'tokenId', defaultTokenId),
    customer_id: get(invoice, 'customerId', customerId),
    doc_type: get(user, 'docType', 'DNI'),
    doc_number: get(user, 'docNumber', '12345678'),
    name: get(invoice, 'firstName', user.firstName),
    last_name: get(invoice, 'lastName', user.lastName),
    email: get(invoice, 'email', user.email),
    city: get(invoice, 'city'),
    address: get(invoice, 'address'),
    phone: get(invoice, 'phone'),
    cell_phone: get(invoice, 'cellPhone'),
    bill: get(invoice, 'bill'),
    description: get(invoice, 'description', 'Rooms Payment'),
    value: get(invoice, 'value'),
    tax: get(invoice, 'tax'),
    tax_base: get(invoice, 'taxBase'),
    currency: get(invoice, 'currency', 'USD'),
    dues: get(invoice, 'dues'),
    ip: get(invoice, 'ip'),
    use_default_card_customer: true,
  };

  return await epayco.charge.create(paymentInfo);
}

module.exports = {
  createInvoice,
  deleteInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  createCardToken,
  createCustomer,
  makePayment,
};
