const mongoose = require('mongoose');

const { Schema } = mongoose;

// Creating UserCollection Schema to be used for the Admin,
// Supplier and Customer
const createSchema = (baseModel, model, options = {}) =>
  new Schema(
    {
      ...baseModel,
      ...model
    },
    {
      timestamps: true,
      collection: 'UserCollection',
      ...options
    }
  );

// User
const userSchema = require('./user');
const user = mongoose.model(
  'user',
  createSchema(undefined, userSchema, {
    discriminatory: 'kind'
  })
);

// Admin
const adminSchema = require('./admin');
const admin = user.discriminator(
  'admin',
  createSchema(userSchema, adminSchema, {})
);

// Supplier
const supplierSchema = require('./supplier');
const supplier = user.discriminator(
  'supplier',
  createSchema(userSchema, supplierSchema, {})
);

// Customer
const customerSchema = require('./customer');
const customer = user.discriminator(
  'customer',
  createSchema(userSchema, customerSchema, {})
);

// Category
const categorySchema = require('./category');
const category = mongoose.model(
  'categoria',
  createSchema(undefined, categorySchema, {
    collection: 'CategoryCollection'
  })
);

module.exports = {
  user,
  admin,
  supplier,
  customer,
  category
};
