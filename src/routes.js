const UserRoutes = require("./resources/Users/users.routes");
const QuestionRoutes = require("./resources/question/question.routes");

module.exports = (app) => {
  app.use("/api/v1/users", UserRoutes);
  app.use("/api/v1/questions", QuestionRoutes);

  app.use("/", (req, res) => res.redirect("http://apihomepage"));
};
