const { category } = require('../models');
const { deleteS3 } = require('../utils/file');

// Check if already Exists
const categoryExists = async (nome) => {
  return (await category.findOne({ nome })) ? true : false;
};

// List all categories
const categoryListAll = async () => {
  const categoryList = await category.find({});

  return categoryList;
};

// Search by ID
const categoryById = async (id) => {
  const categoryFromDB = await category.findById(id);

  return categoryFromDB;
};

// Create category
const createCategory = async (model) => {
  // Check if nome already Exists
  const nameIsValid = await categoryExists(model.nome);

  if (nameIsValid)
    return {
      success: false,
      message: 'Não foi possível criar a categoria',
      details: ['O nome informado já existe na lista de categorias.']
    };

  const newCategory = await category.create({
    nome: model.nome,
    descricao: model.descricao,
    status: model.status,
    key: model.key,
    url: model.url
  });

  const { nome, descricao } = newCategory;

  return {
    success: true,
    message: 'Categoria cadastrada com sucesso.',
    data: {
      nome,
      descricao
    }
  };
};

// Delete category
const deleteCategory = async (id) => {
  const categoryFromDB = await categoryById(id);

  if (!categoryFromDB)
    return {
      success: false,
      message: 'Não foi possível realizar a operação.',
      details: ['Categoria não existe.']
    };

  const { key } = categoryFromDB;
  await Promise.all([
    deleteS3(key),
    category.deleteOne(categoryFromDB)
  ]);

  return {
    success: true,
    message: 'Operação realizada com sucesso.'
  };
};

// Update category
const updateCategory = async (id, model) => {
  // Check if Id exists
  const categoryFromDB = await categoryById(id);

  if (!categoryFromDB)
    return {
      success: false,
      message: 'Não foi possível realizar a operação.',
      details: ['Id da categoria não foi encontrado.']
    };

  // Check if category name is already in use
  const categoryInUse = await category.find({ nome: model.nome });

  if (categoryInUse.length > 0 && categoryInUse[0].id !== categoryFromDB.id)
    return {
      success: false,
      message: 'Não foi possível realizar a operação.',
      details: ['O nome da categoria já está em uso.']
    };

  // Change fields
  categoryFromDB.nome = model.nome;
  categoryFromDB.descricao = model.descricao;
  categoryFromDB.status = model.status;
  categoryFromDB.url_imagem = model.url_imagem; // TODO: remove image

  await categoryFromDB.save();

  return {
    success: true,
    message: 'Operação realizada com sucesso.',
    data: categoryFromDB
  };
};

module.exports = {
  categoryExists,
  categoryListAll,
  categoryById,
  createCategory,
  deleteCategory,
  updateCategory
};
