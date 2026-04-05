const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./notes.db", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to SQLite database");
    }
});

module.exports = db;