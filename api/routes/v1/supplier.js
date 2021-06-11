const joi = require('joi');
const supplierController = require('../../controllers/supplier.controller');
const validateDTO = require('../../utils/validateDto');

module.exports = (router) => {
  router
    .route('/supplier')
    .get(supplierController.listAllSuppliers)
    .post(
      validateDTO(
        'body',
        {
          nome: joi.string().required().messages({
            'any.required': `"Nome" é um campo obrigatório`,
            'string.empty': `"Nome" não deve ser vazio`
          }),
          senha: joi.string().required().messages({
            'any.required': `"Senha" é um campo obrigatório`,
            'string.empty': `"Senha" não deve ser vazio`
          }),
          email: joi.string().required().messages({
            'any.required': `"Email" é um campo obrigatório`,
            'string.empty': `"Email" não deve ser vazio`
          }),
          documento: joi.string().required().messages({
            'any.required': `"Documento" é um campo obrigatório`,
            'string.empty': `"Documento" não deve ser vazio`
          })
        },
        {
          allowUnknown: true
        }
      ),
      supplierController.createSupplier
    );
};
