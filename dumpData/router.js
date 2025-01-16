const { Router } = require("express");

const router = Router();

router.post("/", (req, res) => {
  const { ci, userCode } = req.body;
  let { dummyData } = req.body;
  dummyData = JSON.parse(dummyData);
  //console.log(dummyData);
  return res.status(200).json("ok");
});

module.exports = { router };
