import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import React,{useRef} from 'react';
import EditModal from "./EditModal";



const Cards = ({ title, noteDesc, dateCreated, handleSingleDelete, id,handleUpdate }) => {
  
    const btnEdit = useRef();
    console.log(dateCreated)

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <p>{title}</p>
                    <p>{dateCreated.slice(0,10)}</p>
                </div>
                <div className="card-desc">{noteDesc}</div>
                <div className="btn-container">
                    <button className="btn" ref={btnEdit} onClick={()=>btnEdit.current.openModal()} ><FaEdit /></button>
                    <EditModal ref={btnEdit} title={title} id={id} noteDesc={noteDesc} handleFunction={handleUpdate}/>
                    <button className="btn" onClick={() => handleSingleDelete(id)}><FaTrashAlt /></button>
                </div>
            </div>
        </>
    )
}

export default Cards
