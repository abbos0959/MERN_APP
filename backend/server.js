const colors = require("colors");
require("dotenv").config({});

const DB = require("./connect/mongo");
DB();

const app = require("./middleware/app");

app.listen(process.env.PORT || 7000, () => {
   console.log("server ishladi".bold.underline.yellow);
});
