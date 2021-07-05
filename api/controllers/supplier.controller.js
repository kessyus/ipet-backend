const supplierService = require('../services/supplier.service');

const listAllSuppliers = async (req, res) => {
  const supplierList = await supplierService.listSupplier();

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: supplierList
  });
};

const approveSupplier = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const supplier = await supplierService.approveSupplier(id, status);

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: supplier
  });
};

const createSupplier = async (req, res) => {
  const {
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
  } = req.body;

  const result = await supplierService.createSupplier(
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
  createSupplier,
  approveSupplier
};
