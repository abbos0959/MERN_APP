const colors = require("colors");
require("dotenv").config({});

const app = require("./middleware/app");
const DB = require("./connect/mongo");
DB();

app.listen(process.env.PORT || 7000, () => {
   console.log("server ishladi".bold.underline.yellow);
});
