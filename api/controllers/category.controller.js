const categoryService = require('../services/category.service');

// List all
const listAll = async (req, res) => {
  const categoryList = await categoryService.categoryListAll();

  return res.status(200).send({
    success: true,
    message: 'Operação executada com sucesso.',
    data: categoryList
  });
};

// Search by ID
const searchById = async (req, res) => {
  const { params } = req;
  const category = await categoryService.categoryById(params.id);

  if (!category) {
    return res.status(404).send({
      success: false,
      message: 'Não foi possível encontrar a categoria.',
      details: ['O ID informado não existe.']
    });
  }

  return res.status(200).send({
    success: true,
    message: 'Categoria encontrada.',
    data: category
  });
};

// Create category
const createCategory = async (req, res) => {
  const { body } = req;

  const resultFromService = await categoryService.createCategory(body);
  const httpStatus = resultFromService.success ? 200 : 400;

  return res.status(httpStatus).send({
    resultFromService
  });
};

// Delete category
const deleteCategory = async (req, res) => {
  const { params } = req;

  const resultFromService = await categoryService.deleteCategory(params.id);
  const httpStatus = resultFromService.success ? 200 : 400;

  return res.status(httpStatus).send({
    resultFromService
  });
};

// Update category
const updateCategory = async (req, res) => {
  const { params, body } = req;

  const resultFromService = await categoryService.updateCategory(
    params.id,
    body
  );
  const httpStatus = resultFromService.success ? 200 : 400;

  return res.status(httpStatus).send({
    resultFromService
  });
};

module.exports = {
  listAll,
  searchById,
  createCategory,
  deleteCategory,
  updateCategory
};
