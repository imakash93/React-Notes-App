import { createContext, useState, useEffect } from "react";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [noteEdit, setNoteEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/Notes?_sort=id&_order=desc`);
      if (!response.ok) {
        setNotes([]);
        setIsLoading(false);
        return;
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        setNotes([]);
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setNotes(data);
    } catch {
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`/Notes/${id}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((item) => item.id !== id));
    }
  };

  const addNote = async (newNote) => {
    try {
      const response = await fetch(`/Notes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) return;
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) return;
      const data = await response.json();
      setNotes([data, ...notes]);
    } catch {
      // ignore
    }
  };

  const editNote = (note) => {
    setNoteEdit({ note, edit: true });
  };

  const updateNote = async (id, note) => {
    try {
      const response = await fetch(`/Notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) return;
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) return;
      const data = await response.json();
      setNotes(
        notes.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
    } catch {
      // ignore
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        deleteNote,
        addNote,
        editNote,
        noteEdit,
        updateNote,
        isLoading,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
