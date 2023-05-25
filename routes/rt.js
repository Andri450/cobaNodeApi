const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/").get(controllers.getAllTes);
router.post("/", controllers.createTes);
router.get("/:id/:coba", controllers.getTes);
router.put("/:id", controllers.updateTes);
router.delete("/:id", controllers.deleteTes);

module.exports = router;