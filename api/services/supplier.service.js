const crypto = require('../utils/crypto');
const userMapper = require('../mappers/user.mapper');
const { user, supplier } = require('../models');
const { userIsValid, createCredential } = require('./user.service');

// List all Suppliers
const listSupplier = async () => {
  const supplierListFromDB = await user.find({
    __t: 'supplier'
  });

  const supplierList = userMapper.toSupplierDTO(supplierListFromDB);

  return supplierList;
};

// Create Supplier
const createSupplier = async (
  nome,
  email,
  senha,
  documento,
  rua,
  numero,
  complemento,
  bairro,
  cidade,
  estado,
  cep,
  contato
) => {
  const checkIfExists = await userIsValid(email, senha);

  if (checkIfExists) {
    return {
      success: false,
      message: 'Não foi possível criar o usuário.',
      details: ['Email já cadastrado.']
    };
  }

  const resultFromDB = await supplier.create({
    __t: 'supplier',
    email,
    nome,
    senha: crypto.createHash(`${senha}`),
    documento,
    contato,
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
  createSupplier,
  listSupplier
};
