const express = require("express");
const router = express.Router();

const authRouter = require("../resource/app/router/auth.router");
const roleRouter = require("../resource/app/router/role.router");
const refparamRouter = require("../resource/app/router/reffParam.router");
const AuthorizeUserLogin = require("../resource/middleware/authentification");
const studioRouter = require("../resource/app/router/studio.router");
const genreRouter = require("../resource/app/router/genre.router");
const actorRouter = require("../resource/app/router/actor.router");

router.use("/auth", authRouter);
router.use("/ref-parameter", refparamRouter);
router.use("/role", roleRouter);
router.use("/studio", studioRouter);
router.use("/genre", genreRouter);
router.use("/actor", actorRouter);
router.use(AuthorizeUserLogin);

module.exports = router;
