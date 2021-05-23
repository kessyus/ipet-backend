module.exports = {
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
  pet: [
    {
      nome: {
        type: String,
        required: true
      },
      imagem: String,
      data_nascimento: Date,
      tipo: String,
      raca: String
    }
  ],
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
