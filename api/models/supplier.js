const { number } = require('joi');

module.exports = {
  documento: String,
  endereco: {
    rua: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    referencia: String,
    cep: Number
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
  favoritos: Number,
  classificacao: Number
};
