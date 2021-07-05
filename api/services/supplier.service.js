const crypto = require('../utils/crypto');
const userMapper = require('../mappers/user.mapper');
const { user, supplier } = require('../models');
const { userIsValid, createCredential } = require('./user.service');
const emailUtils = require('../utils/email');

// List all Suppliers
const listSupplier = async () => {
  const supplierListFromDB = await user
    .find({
      kind: 'supplier'
    })
    .sort({ createdAt: -1 });

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
  cidade,
  estado,
  cep
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
    kind: 'supplier',
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
    visivel: false
  });

  if (!resultFromDB) {
    return {
      success: false,
      message: 'Erro ao cadastrar o usuário.',
      details: ['Procure o administrador.']
    };
  }

  return {
    success: true,
    message: 'Usuário cadastrado com sucesso.',
    data: await createCredential(email)
  };
};

// Approve Supplier
const approveSupplier = async (id, status) => {
  const supplierDB = await supplier.findById(id);

  if (!supplierDB) {
    return {
      success: false,
      message: 'Operação não pode ser realizada.',
      details: ['Fornecedor não foi encontrado.']
    };
  }

  supplierDB.visivel = status;

  await supplierDB.save();

  if (status) {
    // Envia e-mail
    emailUtils.send({
      destinatario: supplierDB.email,
      remetente: process.env.SENDGRID_SENDER,
      assunto: `Confirmação do cadastro de ${supplierDB.nome}`,
      corpo:
        'Seja bem vindo(a)! Sua conta do iPet já está liberada e pronta para uso.'
    });
  }

  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: {
      id: supplierDB.id,
      nome: supplierDB.nome,
      email: supplierDB.email
    }
  };
};

module.exports = {
  createSupplier,
  listSupplier,
  approveSupplier
};
