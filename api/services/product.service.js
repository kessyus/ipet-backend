const { product, category, supplier } = require('../models');

// Check if already Exists
const productExists = async (nome) => !!(await product.findOne({ nome }));

// List all products by category
const productByCategoryListAll = async (categoryId) => {
  const { nome: categoryName } = await category.findById(categoryId);
  const suppliersDB = await supplier.find({});

  const listSuppliers = suppliersDB.map((item) => [
    item.id.toString(),
    item.nome
  ]);
  const supplierMap = new Map(listSuppliers);

  const productList = await product.find({ category: categoryId });

  const result = productList.map((item) => ({
    id: item.id,
    nome: item.nome,
    descricao: item.descricao,
    preco: item.preco,
    url: item.url,
    category: item.category,
    supplier: item.supplier,
    createdAt: item.createdAt,
    categoryName,
    supplierName: supplierMap.get(item.supplier.toString())
  }));

  return result;
};

// List all products by supplier Id
const productBySupplierListAll = async (supplier) => {
  const productList = await product.find({ supplier });

  // Map category (id, name)
  const categoryDB = await category.find({});
  const listCategory = categoryDB.map((item) => [
    item.id.toString(),
    item.nome
  ]);
  const categoryMap = new Map(listCategory);

  const result = productList.map((item) => ({
    id: item.id,
    nome: item.nome,
    descricao: item.descricao,
    preco: item.preco,
    url: item.url,
    category: item.category,
    supplier: item.supplier,
    createdAt: item.createdAt,
    categoryName: categoryMap.get(item.category.toString())
  }));

  return result;
};

// List all products with supplier information
const productListAll = async () => {
  // List all product list
  const productList = await product.find({});

  // Map supplier (id, nome)
  const suppliersDB = await supplier.find({});
  const listSuppliers = suppliersDB.map((item) => [
    item.id.toString(),
    item.nome
  ]);
  const supplierMap = new Map(listSuppliers);

  // Map category (id, name)
  const categoryDB = await category.find({});
  const listCategory = categoryDB.map((item) => [
    item.id.toString(),
    item.nome
  ]);
  const categoryMap = new Map(listCategory);

  const result = productList.map((item) => ({
    id: item.id,
    nome: item.nome,
    descricao: item.descricao,
    preco: item.preco,
    url: item.url,
    category: item.category,
    supplier: item.supplier,
    createdAt: item.createdAt,
    categoryName: categoryMap.get(item.category.toString()),
    supplierName: supplierMap.get(item.supplier.toString())
  }));

  return result;
};

// Create product
const createProduct = async (model) => {
  // Check if nome already Exists
  const nameIsValid = await productExists(model.nome);

  if (nameIsValid) {
    return {
      success: false,
      message: 'Não foi possível criar o produto',
      details: [
        'O nome informado já existe na lista de produtos do fornecedor.'
      ]
    };
  }

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
  productListAll,
  createProduct
};
