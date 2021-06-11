const supplierService = require('../services/supplier.service');

const listAllSuppliers = async (req, res, _) => {
  const supplierList = await supplierService.listSupplier();

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: supplierList
  });
};

const createSupplier = async (req, res, _) => {
  const {
    nome,
    email,
    senha,
    documento,
    contato,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep
  } = req.body;

  const result = await supplierService.createSupplier(
    nome,
    email,
    senha,
    documento,
    contato,
    endereco: {
      rua,
      numero,
      bairro,
      cidade,
      estado,
      cep
    }
  );

  const resultCode = result.success ? 200 : 400;
  const returnData = result.success
    ? { data: result.data }
    : { details: result.details };

  return res.status(resultCode).send({
    message: result.message,
    ...returnData
  });
};

module.exports = {
  listAllSuppliers,
  createSupplier
};
