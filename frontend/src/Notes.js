import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:7000");

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const loadNotes = async () => {
    const res = await axios.get("http://localhost:7000/notes");
    setNotes(res.data);
  };

  const createNote = async () => {
    await axios.post("http://localhost:7000/notes", {
      title,
      content,
      ownerId: 1
    });
    socket.emit("noteUpdated");
    loadNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:7000/notes/${id}`);
    socket.emit("noteUpdated");
    loadNotes();
  };

  const editNote = (note) => {
    setCurrentNoteId(note.Id);
    setTitle(note.Title);
    setContent(note.Content);
  };

  const updateNote = async () => {
    await axios.put(`https://realtimenotesapp-jrke.onrender.com//notes/${currentNoteId}`, {
      title,
      content
    });
    socket.emit("noteUpdated");
    loadNotes();
  };

  useEffect(() => {
    loadNotes();

    socket.on("noteUpdated", () => {
      loadNotes();
    });

  }, []);

  return (
    <div>
      <h2>Notes</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={createNote}>Create</button>
      <button onClick={updateNote}>Update</button>

      <ul>
        {notes.map((n) => (
          <li key={n.Id}>
            {n.Title} - {n.Content}
            <button onClick={() => editNote(n)}>Edit</button>
            <button onClick={() => deleteNote(n.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;