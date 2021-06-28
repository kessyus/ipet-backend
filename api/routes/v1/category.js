const multer = require('multer');
const multerConfig = require('../../utils/multer');
const uploadToAWS = require('../../utils/file');
const joi = require('joi');
const validateDTO = require('../../utils/validateDto');
const categoryController = require('../../controllers/category.controller');

module.exports = (router) => {
  router
    .route('/category')
    .get(categoryController.listAll)
    .post(
      multer(multerConfig).single('file'),
      uploadToAWS.uploadS3,
      categoryController.createCategory
    );

  router
    .route('/category/:id')
    .get(
      validateDTO('params', {
        id: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"Id" é um campo obrigatório`,
            'string.empty': `"Id" não deve ser vazio`,
            'string.regex': `"Id" fora do formato esperado`
          })
      }),
      categoryController.searchById
    )
    .delete(
      validateDTO('params', {
        id: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"Id" é um campo obrigatório`,
            'string.empty': `"Id" não deve ser vazio`,
            'string.regex': `"Id" fora do formato esperado`
          })
      }),
      categoryController.deleteCategory
    )
    .put(
      validateDTO('params', {
        id: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"Id" é um campo obrigatório`,
            'string.empty': `"Id" não deve ser vazio`,
            'string.regex': `"Id" fora do formato esperado`
          })
      }),
      validateDTO(
        'body',
        {
          nome: joi.string().required().messages({
            'any.required': `"Nome" é um campo obrigatório`,
            'string.empty': `"Nome" não deve ser vazio`
          }),
          descricao: joi.string().required().messages({
            'any.required': `"Descricao" é um campo obrigatório`,
            'string.empty': `"Descricao" não deve ser vazio`
          }),
          status: joi.boolean().required().messages({
            'any.required': `"Status" é um campo obrigatório`,
            'string.empty': `"Status" não deve ser vazio`
          })
        },
        {
          allowUnknown: true
        }
      ),
      categoryController.updateCategory
    );
};
