import React,{forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-modal';
import { useState } from 'react'

const EditModal = forwardRef(({title, noteDesc,handleFunction,id},ref) => {

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [titleEdit, setTitleEdit] = React.useState(title || "title")
    const [noteEdit, setNoteEdit] = React.useState(noteDesc || 'note')


    function openModal() {
        setIsOpen(true);
    }

    

    function closeModal() {
        setIsOpen(false);
    }


    useImperativeHandle(ref,()=>{
        return {openModal}
    })

    function handleEditTitle(e){
        setTitleEdit(e.target.value)
    }

    function handleEditNote(e){
        setNoteEdit(e.target.value)
    }

   
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >


                <button onClick={closeModal} style={{margin:"1rem"}}  >close</button>
                <form className='modal-form'>
                    <input type='text' value={titleEdit} onChange={handleEditTitle} />
                    <textarea rows={10} cols={10} value={noteEdit} onChange={handleEditNote}></textarea>
                    <button onClick={()=>handleFunction(titleEdit,noteEdit,id)}>save</button>


                </form>
            </Modal>
        </>
    )
})

export default EditModal
