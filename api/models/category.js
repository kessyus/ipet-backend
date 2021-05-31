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
  url_imagem: {
    type: String,
    required: false
  }
};
