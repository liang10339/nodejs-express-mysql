const sql = require("./db.js");
// constructor
const Velocity = function(velocity) {
  this.year = velocity.year;
  this.mph = velocity.mph;
};
Velocity.create = (newVelocity, result) => {
  sql.query("INSERT INTO velocity SET ?", newVelocity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created velocity: ", { id: res.insertId, ...newVelocity });
    result(null, { id: res.insertId, ...newVelocity });
  });
};
Velocity.findByYear = (year, result) => {
  sql.query(`SELECT * FROM velocity WHERE year = ${year}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found velocity: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Velocity with the year
    result({ kind: "not_found" }, null);
  });
};
Velocity.getAll = (year, result) => {
  let query = "SELECT * FROM velocity";
  if (year) {
    query += ` WHERE year LIKE '%${year}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("velocity: ", res);
    result(null, res);
  });
};
Velocity.updateByYear = (year, velocity, result) => {
  sql.query(
    "UPDATE velocity SET mph = ? WHERE year = ?",
    [velocity.year, velocity.mph],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Velocity with the year
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated velocity: ", { year: year, ...velocity });
      result(null, { id: id, ...velocity });
    }
  );
};
Velocity.remove = (id, result) => {
  sql.query("DELETE FROM velocity WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Velocity with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted velocity with id: ", id);
    result(null, res);
  });
};
Velocity.removeAll = result => {
  sql.query("DELETE FROM velocity", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} velocity`);
    result(null, res);
  });
};
module.exports = Velocity;