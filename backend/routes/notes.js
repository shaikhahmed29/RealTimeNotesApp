const express = require("express");
const db = require("../db");

const router = express.Router();

// CREATE NOTE
router.post("/", (req, res) => {
    const { title, content, ownerId } = req.body;

    db.run(
        "INSERT INTO Notes (Title, Content, OwnerId) VALUES (?, ?, ?)",
        [title, content, ownerId],
        function (err) {
            if (err) return res.send(err);

            db.run(
                "INSERT INTO ActivityLogs (UserId, NoteId, Action) VALUES (?, ?, ?)",
                [ownerId, this.lastID, "CREATE"]
            );

            res.send("Note created");
        }
    );
});

// GET NOTES
router.get("/", (req, res) => {
    db.all("SELECT * FROM Notes", [], (err, rows) => {
        res.json(rows);
    });
});

// UPDATE NOTE
router.put("/:id", (req, res) => {
    const { title, content } = req.body;

    db.run(
        "UPDATE Notes SET Title=?, Content=?, LastModified=CURRENT_TIMESTAMP WHERE Id=?",
        [title, content, req.params.id],
        function (err) {
            if (err) return res.send(err);

            db.run(
                "INSERT INTO ActivityLogs (UserId, NoteId, Action) VALUES (?, ?, ?)",
                [1, req.params.id, "UPDATE"]
            );

            res.send("Note updated");
        }
    );
});

// DELETE NOTE
router.delete("/:id", (req, res) => {
    db.run("DELETE FROM Notes WHERE Id=?", [req.params.id], function (err) {
        if (err) return res.send(err);

        db.run(
            "INSERT INTO ActivityLogs (UserId, NoteId, Action) VALUES (?, ?, ?)",
            [1, req.params.id, "DELETE"]
        );

        res.send("Note deleted");
    });
});

module.exports = router;