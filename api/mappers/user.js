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
  const { id, nome, email, kind } = model;

  return {
    id,
    nome,
    email,
    userType: defineUserType(kind)
  };
};

module.exports = {
  toUserDTO
};
