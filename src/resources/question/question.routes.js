// Add Resource Routes at your confort
const Router = require("express");
const router = new Router();
const questionController = require("./question.controller");
const sessionMonitor = require("../../utils/sessionMonitor");

router.get("/user/:userID", sessionMonitor, questionController.getUserQuestions);
router.get("/:id", sessionMonitor, questionController.getOne);
router.get("/", sessionMonitor, questionController.getAll);

router.post("/", questionController.create);
router.patch("/", questionController.update);

module.exports = router;
