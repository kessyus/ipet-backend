module.exports = {
  documento: {
    type: String,
    required: true
  },
  endereco: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    referencia: String,
    cep: String
  },
  comentarios: String,
  postagens: [
    {
      mensagem: String,
      imagem: String,
      data: Date,
      curtidas: Number
    }
  ],
  visivel: Boolean,
  favoritos: {
    type: Number,
    default: 0
  },
  classificacao: {
    type: Number,
    default: 5
  }
};
