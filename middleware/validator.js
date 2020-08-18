const { validate, ValidationError, Joi } = require("express-validation");
// Express Validation Docs https://www.npmjs.com/package/express-validation
// Joi Docs https://github.com/sideway/joi/blob/master/API.md

const validateLogin = () => {
  return validate(
    {
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    },
    { keyByField: true },
    {}
  );
};

const validateUser = () => {
  return validate(
    {
      body: Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string(),
      }),
    },
    { keyByField: true },
    {}
  );
};

const validateTicket = () => {
  return validate(
    {
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        urgent: Joi.boolean(),
      }),
    },
    { keyByField: true },
    {}
  );
};

module.exports = {
  ValidationError,
  Joi,
  validateLogin,
  validateUser,
  validateTicket,
};
