const mongoose = require("mongoose");
const http = require("http");

let ENV = "";
if (process.env.STATUS !== "production" || process.env.STATUS === undefined) {
  ENV = require("./src/config/development");
} else {
  ENV = require("./src/config/production");
}


const connect = () =>
  mongoose.connect(
    // 'mongodb://localhost:27017/aiascs',
    ENV.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

connect()
  .then(async (connection) => {
    // mongoose.set('useCreateIndex':false)
    mongoose.set("useCreateIndex", true)
    const app = require("./app");
    const server = http.createServer(app);
    // const io = require("socket.io").listen(server);

    // io.on("connection", socket => {
    //   console.log("a user connected :D");
    //   socket.on("chat message", msg => {
    //     console.log(msg);
    //     io.emit("chat message", msg);
    //   });
    // });

    server.listen(ENV.PORT, () => {

      console.log(`Listening to PORT :${ENV.PORT}`);
    });
  })
  .catch((e) => {
    console.log(`error  DB/SERVER : ${e}`);
  });
