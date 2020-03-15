const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const SELECT_ALL_CALCULATIONS_QUERY = "SELECT * FROM Calculations";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "helloworld",
  database: "react_sql"
});

connection.connect(err => {
  if (err) return err;
});

console.log(connection);

app.use(cors());

app.get("/", (req, res) => {
  res.send("Go to /calculations to see calculations");
});

app.get("/calculations", (req, res) => {
  connection.query(SELECT_ALL_CALCULATIONS_QUERY, (err, results) => {
    if (err) return res.send(err);
    else return res.json({ data: results });
  });
});

//Initial creation of row for first_num, second_num, and sum_result
app.get("/calculations/add", (req, res) => {
  const { first_num, second_num, sum_result } = req.query;

  const INSERT_ADD_CALCULATION = `INSERT INTO react_sql.calculations(first_num, second_num, sum_result) VALUES (${first_num}, ${second_num}, ${sum_result})`;
  connection.query(INSERT_ADD_CALCULATION, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Successfully added sum calculation");
    }
  });
});

//Updates latest row's product_result column
app.get("/calculations/product", (req, res) => {
  const { product_result } = req.query;
  const RETRIEVE_LAST_ID =
    "SELECT * FROM react_sql.calculations ORDER BY id DESC LIMIT 1";

  connection.query(RETRIEVE_LAST_ID, (err, id) => {
    if (err) return res.send(err);
    else {
      afterRetrievalForProduct(id);
    }
  });

  afterRetrievalForProduct = id => {
    const UPDATE_PRODUCT_CALCULATION = `UPDATE react_sql.calculations SET product_result = ${product_result} WHERE id = ${id[0].id}`;

    connection.query(UPDATE_PRODUCT_CALCULATION, error => {
      if (error) return res.send(error);
      else return res.send("Successfully added product calculation");
    });
  };
});

//Updates latest row's power_result column
app.get("/calculations/power", (req, res) => {
  const { power_result } = req.query;
  const RETRIEVE_LAST_ID =
    "SELECT * FROM react_sql.calculations ORDER BY id DESC LIMIT 1";

  connection.query(RETRIEVE_LAST_ID, (err, id) => {
    if (err) {
      return res.send(err);
    } else {
      afterRetrievalForPower(id);
    }
  });

  afterRetrievalForPower = id => {
    const UPDATE_POWER_CALCULATION = `UPDATE react_sql.calculations SET power_result = ${power_result} WHERE id = ${id[0].id}`;

    connection.query(UPDATE_POWER_CALCULATION, error => {
      if (error) return res.send(error);
      else return res.send("Successfully added power calculation");
    });
  };
});

app.listen(4000, () => console.log("REST API Server on local host 4000"));
