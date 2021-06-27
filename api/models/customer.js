module.exports = {
  rua: String,
  numero: String,
  complemento: String,
  cidade: String,
  estado: String,
  cep: String,
  nome_pet: {
    type: String,
    required: true
  },
  nascimento: Date,
  tipo: String,
  raca: String,
  comentarios: String,
  favoritos: [
    {
      fornecedor: String
    }
  ]
};
