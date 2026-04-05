const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            "INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role],
            function (err) {
                if (err) return res.send(err);
                res.send("User registered successfully");
            }
        );
    } catch (error) {
        res.send(error);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM Users WHERE Email = ?", [email], async (err, user) => {
        if (!user) return res.send("User not found");

        const valid = await bcrypt.compare(password, user.Password);
        if (!valid) return res.send("Invalid password");

        const token = jwt.sign(
            { id: user.Id, role: user.Role },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({
            token: token,
            user: {
                id: user.Id,
                name: user.Name,
                email: user.Email,
                role: user.Role
            }
        });
    });
});

module.exports = router;