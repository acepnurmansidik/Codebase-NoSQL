const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/", controller.getAllUser);
router.post("/", controller.createUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
