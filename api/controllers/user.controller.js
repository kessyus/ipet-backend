const userService = require('../services/user.service');

const auth = async (req, res) => {
  const { email, senha } = req.body;

  const result = await userService.authenticate(email, senha);

  const resultCode = result.success ? 200 : 401;
  const returnData = result.success
    ? { data: result.data }
    : { details: result.details };

  return res.status(resultCode).send({
    message: result.message,
    ...returnData
  });
};

module.exports = {
  auth
};
