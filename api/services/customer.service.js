const crypto = require('../utils/crypto');
const userMapper = require('../mappers/user.mapper');
const { user, customer } = require('../models');
const { userIsValid, createCredential } = require('./user.service');

// List all Customers
const listCustomer = async () => {
  const customerListFromDB = await user.find({
    kind: 'customer'
  });

  const customerList = userMapper.toCustomerDTO(customerListFromDB);

  return customerList;
};

// Create Customer
const createCustomer = async (
  nome,
  email,
  senha,
  documento,
  rua,
  numero,
  complemento,
  cidade,
  estado,
  cep,
  nome_pet,
  nascimento,
  tipo,
  raca
) => {
  const checkIfExists = await userIsValid(email, senha);

  if (checkIfExists) {
    return {
      success: false,
      message: 'Não foi possível criar o usuário.',
      details: ['Email já cadastrado.']
    };
  }

  const resultFromDB = await customer.create({
    kind: 'customer',
    email,
    nome,
    senha: crypto.createHash(`${senha}`),
    documento,
    rua,
    numero,
    complemento,
    cidade,
    estado,
    cep,
    nome_pet,
    nascimento,
    tipo,
    raca
  });

  if (!resultFromDB) {
    return {
      success: false,
      message: 'Erro ao cadastrar o usuário.',
      data: 'Procure o administrador.'
    };
  }

  return {
    success: true,
    message: 'Usuário cadastrado com sucesso.',
    data: await createCredential(email)
  };
};

module.exports = {
  createCustomer,
  listCustomer
};
