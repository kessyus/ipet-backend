const toUserDTO = (model) => {
  const { id, nome, email, kind } = model;

  return {
    id,
    nome,
    email,
    userType: kind
  };
};

const toSupplierDTO = (model) => {
  const filteredData = model.map((item) => ({
    id: item.id,
    nome: item.nome,
    documento: item.documento,
    email: item.email,
    visivel: item.visivel,
    cidade: item.cidade,
    estado: item.estado,
    dt_criacao: item.createdAt
  }));

  return filteredData;
};

const toCustomerDTO = (model) => {
  const filteredData = model.map((item) => ({
    id: item.id,
    nome: item.nome,
    email: item.email,
    cidade: item.cidade,
    estado: item.estado,
    dt_criacao: item.createdAt
  }));

  return filteredData;
};

module.exports = {
  toUserDTO,
  toCustomerDTO,
  toSupplierDTO
};
