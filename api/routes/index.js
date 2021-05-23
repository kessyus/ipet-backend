const { Router } = require('express');
const { name, version } = require('../../package.json');

// route imports
const v1UserRoute = require('./v1/user');

module.exports = (app) => {
  // greetings message
  app.get('/', (_, res) => {
    res.send({ name, version });
  });

  //v1 Routes
  const routerV1 = Router();
  v1UserRoute(routerV1);

  app.use('/v1', routerV1);
};
