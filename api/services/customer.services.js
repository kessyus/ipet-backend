const crypto = require('../utils/crypto');
const userMapper = require('../mappers/user.mapper');
const { user, customer } = require('../models');
const { userIsValid, createCredential } = require('./user.service');

// List all Customers
const listAllCustomer = async () => {
  const customerListFromDB = await user.find({
    __t: 'customer'
  });

  const customerList = userMapper.toCustomerDTO(customerListFromDB);

  return customerList;
};

// Create Customer
const createCustomer = async (
  nome,
  email,
  senha,
  rua,
  numero,
  complemento,
  bairro,
  cidade,
  estado,
  cep,
  tipo
) => {
  const checkIfExists = userIsValid(email, senha);

  if (checkIfExists) {
    return {
      success: false,
      message: 'Não foi possível criar o usuário.',
      details: ['Email já cadastrado.']
    };
  }

  const resultFromDB = await supplier.create({
    __t: tipo,
    email,
    nome,
    senha: crypto.createHash(`${senha}`),
    documento,
    endereco: {
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep
    },
    visivel: false
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

// Approve Supplier
const approveSupplier = async () => {};

module.exports = {
  createCustomer,
  listAllCustomer
};
