const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'supplier'
  }
}