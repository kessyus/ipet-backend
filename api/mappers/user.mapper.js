const defineUserType = (type) => {
  switch (type) {
    case 'admin':
      return 1;

    case 'customer':
      return 2;

    case 'supplier':
      return 3;

    default:
      break;
  }
};

const toUserDTO = (model) => {
  const { id, nome, email, __t } = model;

  return {
    id,
    nome,
    email,
    userType: defineUserType(__t)
  };
};

const toSupplierDTO = (model) => {
  const filteredData = model.map((item) => ({
    id: item.id,
    nome: item.nome,
    documento: item.documento,
    email: item.email,
    visivel: item.visivel,
    cidade: item.endereco.cidade,
    estado: item.endereco.estado,
    dt_criacao: item.createdAt
  }));

  return filteredData;
};

const toCustomerDTO = (model) => {
  const filteredData = model.map((item) => ({
    id: item.id,
    nome: item.nome,
    email: item.email,
    cidade: item.endereco.cidade,
    estado: item.endereco.estado,
    dt_criacao: item.createdAt
  }));

  return filteredData;
};

module.exports = {
  toUserDTO,
  toCustomerDTO,
  toSupplierDTO
};
