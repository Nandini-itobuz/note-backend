import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import './App.css'

async function getNotes(setAllNotes) {
  try {
    const rawData = await axios.get("http://localhost:3001/note", {
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxOGRhN2UyNzJjMGM5MWMzNTM0MiIsImlhdCI6MTcxMTA4NTc4Nn0.EkiSyx6FD8QpRVjV2NzlniCQboUbij2ISRInhBpbHH0",
      },
    });

    setAllNotes(rawData.data.data);

  } catch (e) {
    console.log(e);
  }
}

function App() {
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getNotes(setAllNotes)
  }, [])

  async function handleSingleDelete(id) {
    try {
      const rawData = await axios.delete(`http://localhost:3001/note/delete/${id}`, {
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxOGRhN2UyNzJjMGM5MWMzNTM0MiIsImlhdCI6MTcxMTA4NTc4Nn0.EkiSyx6FD8QpRVjV2NzlniCQboUbij2ISRInhBpbHH0",
        },
      });
      getNotes(setAllNotes)
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSingleDelete(id) {
    try {
      const rawData = await axios.delete(`http://localhost:3001/note/delete/${id}`, {
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxOGRhN2UyNzJjMGM5MWMzNTM0MiIsImlhdCI6MTcxMTA4NTc4Nn0.EkiSyx6FD8QpRVjV2NzlniCQboUbij2ISRInhBpbHH0",
        },
      });
      getNotes(setAllNotes)
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdate(title, note, id) {
    try {
      const rawData = await axios({
        method: `put`,
        url: `http://localhost:3001/note/update/${id}`,
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxOGRhN2UyNzJjMGM5MWMzNTM0MiIsImlhdCI6MTcxMTA4NTc4Nn0.EkiSyx6FD8QpRVjV2NzlniCQboUbij2ISRInhBpbHH0",
        },
        data: {
          title, note
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  async function handleNewNote(title, note) {
    try {
      const rawData = await axios({
        method: `post`,
        url: `http://localhost:3001/note/data`,
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxOGRhN2UyNzJjMGM5MWMzNTM0MiIsImlhdCI6MTcxMTA4NTc4Nn0.EkiSyx6FD8QpRVjV2NzlniCQboUbij2ISRInhBpbHH0",
        },
        data: {
          title, note
        }
      })
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <>
      <Header notes={allNotes} handleSingleDelete={handleSingleDelete} handleUpdate={handleUpdate} handleNewNote={handleNewNote} />


    </>
  )
}

export default App
