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

module.exports = {
  toUserDTO
};
