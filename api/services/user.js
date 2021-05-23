const { user } = require('../models/');
const crypto = require('../utils/crypto');
const userMapper = require('../mappers/user');

// Checks if user exists
const userIsValid = async (email, senha) => {
  return (await user.findOne({ email, senha: crypto.createHash(senha) }))
    ? true
    : false;
};

// Create token
const createCredential = async (email) => {
  const userFromDB = await user.findOne({
    email
  });

  const userDTO = userMapper.toUserDTO(userFromDB);

  return {
    token: crypto.createToken(userDTO),
    userDTO
  };
};

// Complete authentication returning token + userdata
// or error message
const authenticate = async (email, senha) => {
  const result = await userIsValid(email, senha);

  if (!result) {
    return {
      success: false,
      message: 'Não foi possivel autenticar o usuário.',
      details: ['Usuário ou senha inválido.']
    };
  }

  return {
    success: true,
    message: 'Usuário autenticado com sucesso.',
    data: await createCredential(email)
  };
};

module.exports = {
  authenticate
};
