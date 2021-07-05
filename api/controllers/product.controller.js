const productService = require('../services/product.service');

// List all by Category
const listAllByCategory = async (req, res) => {
  const { params } = req;
  const productList = await productService.productByCategoryListAll(
    params.category
  );

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: productList
  });
};

// List all by Supplier
const listAllBySupplier = async (req, res) => {
  const { params } = req;
  const productList = await productService.productBySupplierListAll(
    params.supplier
  );

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: productList
  });
};

// List all with Supplier information
const listAll = async (req, res) => {
  const productList = await productService.productListAll();

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: productList
  });
};

// Create product
const createProduct = async (req, res) => {
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
  listAll,
  createProduct
};
