module.exports = {
  documento: {
    type: String,
    required: true
  },
  rua: String,
  numero: String,
  complemento: String,
  cidade: String,
  estado: String,
  cep: String,
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
  }
};