const Joi = require('joi');
const joiObjectId = require('joi-objectid');

Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

const PayloadSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().min(8).max(30).required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  document: Joi.string(),
  cart: Joi.array().items(Joi.objectId()).single(),
  role: Joi.string().default('client'),
  active: Joi.boolean().default(false)
});

const UserSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = { PayloadSchema, ParamsSchema, UserSchema };
