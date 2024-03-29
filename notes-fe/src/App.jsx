import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./Register";
import './App.css'
import Navabr from './components/Navabr'
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function App() {
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    getNotes(setAllNotes)
  }, [])

  async function getNotes(setAllNotes) {
    const token = localStorage.getItem("token");
    try {
      const rawData = await axios.get("http://localhost:3001/note", {
        headers: {
          Authorization:
            `bearer ${token}`,
        },
      });
  
      setAllNotes(rawData.data.data);
  
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSingleDelete(id) {
    const token = localStorage.getItem("token");
    try {
      const rawData = await axios.delete(`http://localhost:3001/note/delete/${id}`, {
        headers: {
          Authorization:
            `bearer ${token}`,
        },
      });
      getNotes(setAllNotes)
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSingleDelete(id) {
    const token = localStorage.getItem("token");

    try {
      const rawData = await axios.delete(`http://localhost:3001/note/delete/${id}`, {
        headers: {
          Authorization:
            `bearer ${token}`,
        },
      });
      getNotes(setAllNotes)
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdate(title, note, id) {
    const token = localStorage.getItem("token");

    try {
      const rawData = await axios({
        method: `put`,
        url: `http://localhost:3001/note/update/${id}`,
        headers: {
          Authorization:
            `bearer ${token}`,
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
    const token = localStorage.getItem("token");

    try {
      const rawData = await axios({
        method: `post`,
        url: `http://localhost:3001/note/data`,
        headers: {
          Authorization:
            `bearer ${token}`,
        },
        data: {
          title, note
        }
      })
    } catch (e) {
      console.log(e)
    }
  }


  const handleRegistration = async (name, email, password,setName,setEmail,setPassword) => {

    try {
      const rawData = await axios({
        method: "post",
        url: `http://127.0.0.1:3001/user/data`,
        headers: {
          'Content-Type': `application/json`
        },
        data: {
          name, email, password
        }
      })
      setPassword('');
      setEmail('');
      setName('')
      alert("Login with your registered email to make notes")
    } catch (e) {
      alert(e.response.data.message)
      setPassword('');
      setEmail('');
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const rawData = await axios({
        method: "post",
        url: `http://127.0.0.1:3001/user/login`,
        headers: {
          'Content-Type': `application/json`
        },
        data: {
          email, password
        }
      })
      console.log(rawData.data.token)
      localStorage.setItem("token", rawData.data.token)
      getNotes(setAllNotes)
      navigate('/head')
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <>
    <Navabr />
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="/user" element={< Register handleRegistration={handleRegistration}/>}  />
      <Route path="/head" element={<Header notes={allNotes} handleSingleDelete={handleSingleDelete}
       handleUpdate={handleUpdate} 
       handleNewNote={handleNewNote}
       setAllNotes={setAllNotes} />} />
    </Routes>


    </>
  )
}

export default App
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDY3ZjQ5MGNlMjhmN2Q1ZmNhMzJlYyIsImlhdCI6MTcxMTcwMTkzOX0.E9OMlkOa4NqFrYHMVFgm9KP8bb3n_f29-GNEjDDX4RU