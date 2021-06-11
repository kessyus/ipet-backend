const { Router } = require('express');
const { name, version } = require('../../package.json');

// route imports
const v1UserRoute = require('./v1/user');
const v1UploadRoute = require('./v1/upload');
const v1CategoryRoute = require('./v1/category');
const v1SupplierRoute = require('./v1/supplier');

module.exports = (app) => {
  // greetings message
  app.get('/', (_, res) => {
    res.send({ name, version });
  });

  //v1 Routes
  const routerV1 = Router();
  v1UserRoute(routerV1);
  v1UploadRoute(routerV1);
  v1CategoryRoute(routerV1);
  v1SupplierRoute(routerV1);

  app.use('/v1', routerV1);
};
