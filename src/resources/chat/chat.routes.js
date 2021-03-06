// Add Resource Routes at your confort
const Router = require("express");
const router = new Router();
const chatController = require("./chat.controller");
const sessionMonitor = require("../../utils/sessionMonitor");

router.get("/question/latest/:questionId", sessionMonitor, chatController.getQuestionsLatestMessage);
router.get("/question/:questionId", sessionMonitor, chatController.getQuestionsThread);
router.get("/:id", sessionMonitor, chatController.getOne);
router.get("/", sessionMonitor, chatController.getAll);
router.post("/sync", chatController.syncOffineMessages);
router.post("/", chatController.create);
router.patch("/", chatController.update);

module.exports = router;
