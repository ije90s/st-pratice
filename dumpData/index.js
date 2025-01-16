const express = require("express");
const cors = require("cors");
const { router } = require("./router");

const app = express();

//json 처리
app.use(express.json());

app.use(cors());

app.use("/register", router);

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
