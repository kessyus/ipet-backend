const customerService = require('../services/customer.service');

const listAllCustomers = async (req, res, _) => {
  const customerList = await customerService.listAllCustomers();

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: customerList
  });
};

const createCustomer = async (req, res, _) => {
  const {
    nome,
    email,
    senha,
    documento,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    tipo
  } = req.body;

  const customer = await customerService.createCustomer(
    nome,
    email,
    senha,
    documento,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    tipo
  );

  const resultCode = customer.success ? 200 : 400;
  const returnData = result.success
    ? { data: result.data }
    : { details: result.details };

  return res.status(resultCode).send({
    message: result.message,
    ...returnData
  });
};

module.exports = {
  listAllCustomers,
  createCustomer
};
