const Authchema = require("./auth.schema");
const RefParameterSchema = require("./reffParameter.schema");
const RoleSchema = require("./role.schema");

const GlobalSchema = {
  ...Authchema.Register,
  ...Authchema.Login,
  ...Authchema.ForgotPassword,
  ...RefParameterSchema,
  ...RoleSchema,
};

module.exports = GlobalSchema;
