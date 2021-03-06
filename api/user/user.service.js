/* eslint-disable no-useless-catch */
const User = require('./user.model');
const get = require('lodash/get');

/**
 * Get all users
 * @returns all users
 */

async function getAllUsers() {
  const users = await User.find({}, '-password');
  return users;
}

/**
 *
 * @param {string} email email of use to identify user
 * @returns user
 */

async function getUserByEmail(email) {
  const user = await User.findOne({ email });

  return user;
}

/**
 * Get user by id
 * @param {string} id Indentifier of the note to be filtered
 * @returns user
*/
async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

/**
 * Get user by query
 * @param {string} query Indentifier of the note to be filtered
 * @returns user
*/
async function findOneUser(query) {
  const user = await User.findOne(query).populate({ path: 'cart.room', populate: { path: 'hotel' } });
  return user;
}

/**
 * Create a new user
 * @param {Object} user User to create
 * @returns User created
 */
async function createUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

/**
 * Update a user
 * @param {string} id Indentifier of the user to be updated
 * @param {*} user Body of the user to be updated
 * @returns user updated
 */
async function updateUser(id, user) {
  // const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }, function(err, doc) {
  //   if (err) throw err;
  //   doc.save();
  // });
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }).populate({ path: 'cart.room', populate: { path: 'hotel' } });
  return updatedUser;
}

/**
 * Delete a user
 * @param {String} id Identifier of the user to be deleted
 * @returns User deleted
 */
async function deleteUser(id) {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
}

async function addBillingCards(user, card) {
  const creditCards = get(user, 'billing.creditCards', []);
  const customer = {
    billing: {
      creditCards: creditCards.concat(card),
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });
  return updatedUser;
}

async function addBillingCustomerId(user, customerId) {
  const creditCards = get(user, 'billing.creditCards', []);
  const customer = {
    billing: {
      creditCards,
      customerId
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });
  return updatedUser;
}

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  findOneUser,
  updateUser,
  addBillingCards,
  addBillingCustomerId
};
