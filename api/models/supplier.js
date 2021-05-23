module.exports = {
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
