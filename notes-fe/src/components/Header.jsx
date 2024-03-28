import Cards from "./Cards";
import EditModal from "./EditModal";
import React,{useRef} from "react";



const Header = ({ notes, handleSingleDelete, handleUpdate, handleNewNote }) => {
  const newNote = useRef();
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







  return (
    <>
      <div className="header-container">
        <p >My Notes</p>
        <button className="search-box"  ref={newNote}  onClick={()=>newNote.current.openModal()}>+</button>
        <EditModal ref={newNote} handleFunction={handleNewNote} />
        <p className="greeting" >{greeting}, Name</p>
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


