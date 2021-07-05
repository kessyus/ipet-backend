const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = {
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: 'product'
    }
  ]
};
