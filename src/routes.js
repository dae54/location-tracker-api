const UserRoutes = require("./resources/Users/users.routes");
const QuestionRoutes = require("./resources/question/question.routes");
const ChatRoutes = require("./resources/chat/chat.routes");

module.exports = (app) => {
  app.use("/api/v1/users", UserRoutes);
  app.use("/api/v1/questions", QuestionRoutes);
  app.use("/api/v1/chat", ChatRoutes);

  app.use("/", (req, res) => res.redirect("http://apihomepage"));
};
