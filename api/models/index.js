const mongoose = require('mongoose');

const { Schema } = mongoose;

// Creating Users Collection Schema to be used for the Admin,
// Supplier and Customer
const createSchema = (baseModel, model, options = {}) => new Schema(
    {
      ...baseModel,
      ...model
    },
    {
      timestamps: true,
      collection: 'user',
      ...options
    }
  );

// User
const userSchema = require('./user');

const user = mongoose.model(
  'user',
  createSchema(undefined, userSchema, {
    discriminatorKey: 'kind'
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
  'category',
  createSchema(undefined, categorySchema, {
    collection: 'category',
    toJSON: {
      virtuals: true
    }
  })
);

// Product
const productSchema = require('./product');

const product = mongoose.model(
  'product',
  createSchema(undefined, productSchema, {
    collection: 'product',
    toJSON: {
      virtuals: true
    }
  })
);

module.exports = {
  user,
  admin,
  supplier,
  customer,
  category,
  product
};
