const productService = require('../services/product.service');

// List all by Category
const listAllByCategory = async (req, res, _) => {
  const { params } = req;
  const productList = await productService.productByCategoryListAll(params.category);

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: productList
  });
};

// List all by Supplier
const listAllBySupplier = async (req, res, _) => {
  const { params } = req;
  const productList = await productService.productBySupplierListAll(params.supplier);

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: productList
  });
};

// Create product
const createProduct = async (req, res, _) => {
  const { body } = req;

  const resultFromService = await productService.createProduct(body);
  const httpStatus = resultFromService.success ? 200 : 400;

  return res.status(httpStatus).send({
    resultFromService
  });
};

module.exports = {
  listAllByCategory,
  listAllBySupplier,
  createProduct,
};
