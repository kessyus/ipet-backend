const File = require('../models/file');

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

module.exports = {
  uploadS3
}