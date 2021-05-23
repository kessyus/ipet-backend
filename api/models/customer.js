module.exports = {
  comentarios: String,
  favoritos: [
    {
      fornecedor: String
    }
  ],
  classificacoes: [
    {
      nota: Number,
      fornecedor: String
    }
  ]
};
