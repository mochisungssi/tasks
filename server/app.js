const express = require("express");
const port = 6673;
const router = require("./router/controller");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
