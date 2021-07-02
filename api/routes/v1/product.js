const multer = require('multer');
const multerConfig = require('../../utils/multer');
const uploadToAWS = require('../../utils/file');
const joi = require('joi');
const validateDTO = require('../../utils/validateDto');
const productController = require('../../controllers/product.controller');

module.exports = (router) => {
  router
    .route('/product')
    .post(
      multer(multerConfig).single('file'),
      uploadToAWS.uploadS3,
      productController.createProduct
    );

  router
    .route('/product/category/:category')
    .get(
      validateDTO('params', {
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"Category" é um campo obrigatório`,
            'string.empty': `"Category" não deve ser vazio`,
            'string.regex': `"Category" fora do formato esperado`
          })
      }),
      productController.listAllByCategory
    );

  router
    .route('/product/supplier/:supplier')
    .get(
      validateDTO('params', {
        supplier: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': `"Supplier" é um campo obrigatório`,
            'string.empty': `"Supplier" não deve ser vazio`,
            'string.regex': `"Supplier" fora do formato esperado`
          })
      }),
      productController.listAllBySupplier
    );
};