const customerService = require('../services/customer.service');

const listAllCustomers = async (req, res, _) => {
  const customerList = await customerService.listCustomer();

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
    complemento,
    cidade,
    estado,
    cep,
    nome_pet,
    nascimento,
    tipo,
    raca
  } = req.body;

  const result = await customerService.createCustomer(
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
  listAllCustomers,
  createCustomer
};
