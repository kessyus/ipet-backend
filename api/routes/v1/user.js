const joi = require('joi');
const userController = require('../../controllers/user');
const validateDTO = require('../../utils/validateDto');

module.exports = (router) => {
  router.route('/auth').post(
    validateDTO('body', {
      email: joi.string().required().messages({
        'any.required': `"E-mail" é um campo obrigatório`,
        'string.empty': `"E-mail" não deve ser vazio`
      }),
      senha: joi.string().required().messages({
        'any.required': `"Senha" é um campo obrigatório`,
        'string.empty': `"Senha" não deve ser vazio`
      })
    }),
    userController.auth
  );
};
