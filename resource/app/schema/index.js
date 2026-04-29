const Authchema = require("./auth.schema");
const RefParameterSchema = require("./reffParameter.schema");
const RoleSchema = require("./role.schema");
const ActorSchema = require("./actor.schema");
const GenreSchema = require("./genre.schema");
const StudioSchema = require("./studio.schema");

const GlobalSchema = {
  ...Authchema.Register,
  ...Authchema.Login,
  ...Authchema.ForgotPassword,
  ...RefParameterSchema,
  ...RoleSchema,
  ...ActorSchema,
  ...GenreSchema,
  ...StudioSchema,
};

module.exports = GlobalSchema;
