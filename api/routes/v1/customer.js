const joi = require('joi');
const customerController = require('../../controllers/customer.controller');
const validateDTO = require('../../utils/validateDto');

module.exports = (router) => {
  router
    .route('/customer')
    .get(customerController.listAllCustomers)
    .post(
      validateDTO(
        'body',
        {
          nome: joi.string().required().messages({
            'any.required': '"Nome" é um campo obrigatório',
            'string.empty': '"Nome" não deve ser vazio'
          }),
          senha: joi.string().required().messages({
            'any.required': '"Senha" é um campo obrigatório',
            'string.empty': '"Senha" não deve ser vazio'
          }),
          email: joi.string().required().messages({
            'any.required': '"Email" é um campo obrigatório',
            'string.empty': '"Email" não deve ser vazio'
          }),
          documento: joi.string().required().messages({
            'any.required': '"Documento" é um campo obrigatório',
            'string.empty': '"Documento" não deve ser vazio'
          }),
          nome_pet: joi.string().required().messages({
            'any.required': '"Nome do Pet" é um campo obrigatório',
            'string.empty': '"Nome do Pet" não deve ser vazio'
          })
        },
        {
          allowUnknown: true
        }
      ),
      customerController.createCustomer
    );
};
