const express = require("express");
const router = express.Router();

const authRouter = require("../resource/app/router/auth.routes");
const roleRouter = require("../resource/app/router/role.routes");
const refparamRouter = require("../resource/app/router/reffParam.routes");
const AuthorizeUserLogin = require("../resource/middleware/authentification");

router.use("/auth", authRouter);
router.use("/role", roleRouter);
router.use("/ref-parameter", refparamRouter);
router.use(AuthorizeUserLogin);

module.exports = router;
