const app = require("./app");

const { connectToDB } = require("./config/db");

//server configuration
const port = process.env.PORT || 3002;

const init = async () => {
  await connectToDB();
  app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}`);
  });
};

init();
