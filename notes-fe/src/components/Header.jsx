import Cards from "./Cards";
import EditModal from "./EditModal";
import React,{useRef} from "react";
import { useNavigate } from "react-router-dom";


const Header = ({ notes, handleSingleDelete, handleUpdate, handleNewNote,setAllNotes }) => {
  const newNote = useRef();
  const navigate = useNavigate();
  let currTime = new Date().getHours();

  let greeting;
  if (currTime >= 1 && currTime < 12) {
    greeting = 'Good morning'
  }
  else if (currTime >= 12 && currTime < 18) {
    greeting = 'Good afternoon'

  }
  else if (currTime >= 18) {
    greeting = 'Good Evening'

  }

  const logout = () =>{
    localStorage.setItem("token", "");
    setAllNotes([]);
    navigate('/login')
  }

  return (
    <>
      <div className="header-container">
        <p >My Notes</p>
        <button className="search-box"  ref={newNote}  onClick={()=>newNote.current.openModal()}>+</button>
        <EditModal ref={newNote} handleFunction={handleNewNote} />
        <p className="greeting" >{greeting}, Name</p>
        <button onClick={() =>{logout()}} >Logout</button>
      </div>

      <div className="main-container">
        {notes?.map(element => (

          <Cards title={element.title} noteDesc={element.note} dateCreated={element.createdAt} handleSingleDelete={handleSingleDelete} id={element._id} handleUpdate={handleUpdate} />
        ))}
      </div>

    </>

  )
}

export default Header


