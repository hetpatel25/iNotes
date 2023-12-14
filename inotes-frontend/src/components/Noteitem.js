import React, { useContext } from 'react'
import NoteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const context = useContext(NoteContext);
    const {notes, deleteNote} = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
                    <div className="d-flex">
                <h5 className="card-title">{note.title}</h5>
                <i className="fa-regular fa-trash-can mx-2" onClick={()=>{
                    deleteNote(note._id);
                }}></i>
                <i className="fa-regular fa-pen-to-square" onClick={()=>{
                    updateNote(note);
                }}></i>
                </div>
                <p className="card-text">{note.description}</p> 
                
                </div>
            </div>
        </div>
    )
} 

export default Noteitem