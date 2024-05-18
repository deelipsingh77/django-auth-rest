import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, [showInput]);

  const getNotes = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/notes/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });

      if (response.ok) {
        let data = await response.json();
        setNotes(data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      if (error.message === "Unauthorized") {
        logoutUser();
      }
    }
  };

  const handleNewNote = () => {
    setShowInput((prev) => !prev);
  };

  const handleConfirm = async () => {
    const response = await fetch("http://localhost:8000/api/notes/add/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        body: inputValue,
      }),
    });
    setInputValue("");
    setShowInput(false);
  };

  return (
    <div className="w-[80%] mx-auto flex flex-col items-center justify-center gap-5 my-2">
      <ul className="flex flex-col justify-center items-center gap-5 w-[40%]">
        {notes.map((note) => {
          return (
            <li key={note.id} className="bg-slate-200 p-5 rounded-2xl">
              {note.body}
            </li>
          );
        })}
      </ul>
      {showInput && (
        <div className="new-note-contaier">
          <input
            type="text"
            name="new-note"
            id="new-note"
            placeholder="Enter new note..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button
            className="bg-green-500 p-3 w-max text-white rounded-2xl"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      )}
      {!showInput && (
        <button
          className="bg-green-500 p-3 w-max text-white rounded-2xl"
          onClick={handleNewNote}
        >
          New Note
        </button>
      )}
    </div>
  );
};
export default HomePage;
