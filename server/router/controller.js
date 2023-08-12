const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//for db connection
const mssql = require("mssql");
const mysql = require("mysql");
const { request } = require("express");

const dotenv = require("dotenv");
dotenv.config();

const db = {
  user: process.env.MS_SQL_USER,
  password: process.env.MS_SQL_PASSWORD,
  server: process.env.MS_SQL_HOST,
  database: process.env.MS_SQL_DATABASE,
  options: {
    abortTransactionOnError: true,
    enableArithAbort: true,
    encrypt: false,
  },
};

router.get("/getTasks", (req, res) => {
  let sql = "SELECT * FROM tasks";
  mssql.connect(db, function (err) {
    if (err) {
      console.log(err);
    }
    var request = new mssql.Request();
    request.query(sql, function (err, recordset) {
      if (err) {
        console.log(err);
      } else {
        res.send(recordset.recordset);
      }
    });
  });
});

module.exports = router;
