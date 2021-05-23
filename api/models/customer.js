module.exports = {
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
