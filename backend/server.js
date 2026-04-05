const auth = require("./middleware/auth");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const db = require("./db");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");

const app = express();
app.use(cors());
app.use(express.json());

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Email TEXT,
        Password TEXT,
        Role TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS Notes (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT,
        Content TEXT,
        OwnerId INTEGER,
        LastModified DATETIME DEFAULT CURRENT_TIMESTAMP,
        PublicToken TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ActivityLogs (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        UserId INTEGER,
        NoteId INTEGER,
        Action TEXT,
        Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

// Root route
app.get("/", (req, res) => {
    res.send("Real-Time Notes API is running");
});

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("join-note", (noteId) => {
        socket.join(noteId);
    });

    socket.on("edit-note", ({ noteId, content }) => {
        socket.to(noteId).emit("note-updated", content);
    });
});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});