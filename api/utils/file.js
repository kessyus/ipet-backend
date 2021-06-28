const File = require('../models/file');

// Search by ID
const fileByKey = async (key) => {
  const fileFromDB = await File.findOne({ key });

  return fileFromDB;
};

// Upload files to AWS S3
const uploadS3 = async (req, res, next) => {
  const { originalName: name, size, key, location: url = '' } = req.file;

  const postFile = await File.create({
    name,
    size,
    key,
    url
  });

  if (!postFile) {
    return {
      success: false,
      message: 'Não foi possível fazer o upload da imagem',
      details: ['contate o administrador.']
    };
  }

  req.body = {
    ...req.body,
    key,
    url
  }

  return next();
}

// Deletes files from AWS S3
const deleteS3 = async (key) => {
  const fileFromDB = await fileByKey(key);

  if (!fileFromDB) 
    return {
      success: false,
      message: 'Não foi possível realizar a operação.',
      details: ['Arquivo não existe.']
    }

  await File.deleteOne(fileFromDB);

  return {
    success: true,
    message: 'Operação realizada com sucesso.'
  };
};

module.exports = {
  uploadS3,
  deleteS3
}