const { product } = require('../models');

// Check if already Exists
const productExists = async (nome) => {
  return (await product.findOne({ nome })) ? true : false;
};

// List all products by category
const productByCategoryListAll = async (category) => {
  const productList = await product.find({ category });

  return productList;
};

// List all products by supplier Id
const productBySupplierListAll = async (supplier) => {
  const productList = await product.find({ supplier });

  return productList;
};

// Create product
const createProduct = async (model) => {
  // Check if nome already Exists
  const nameIsValid = await productExists(model.nome);

  if (nameIsValid)
    return {
      success: false,
      message: 'Não foi possível criar o produto',
      details: ['O nome informado já existe na lista de produtos do fornecedor.']
    };

  const newProduct = await product.create({
    nome: model.nome,
    descricao: model.descricao,
    preco: model.preco,
    key: model.key,
    url: model.url,
    category: model.category,
    supplier: model.supplier
  });

  const { nome, descricao } = newProduct;

  return {
    success: true,
    message: 'Produto cadastrado com sucesso.',
    data: {
      nome,
      descricao
    }
  };
};

module.exports = {
  productExists,
  productByCategoryListAll,
  productBySupplierListAll,
  createProduct,
};
