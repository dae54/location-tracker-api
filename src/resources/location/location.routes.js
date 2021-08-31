// Add Resource Routes at your confort
const Router = require("express");
const router = new Router();
const locationController = require("./location.controller");
const sessionMonitor = require("../../utils/sessionMonitor");

router.get("/:userID", sessionMonitor, locationController.getOne);
router.get("/", sessionMonitor, locationController.getAll);
router.post("/", locationController.create);
router.patch("/:userID", locationController.update);

module.exports = router;
