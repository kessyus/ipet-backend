const { Router } = require('express');
const { name, version } = require('../../package.json');

module.exports = (app) => {
  app.get('/', (_, res) => {
    res.send({ name, version });
  });

  const routerV1 = Router();
  app.use('/v1', routerV1);
};
