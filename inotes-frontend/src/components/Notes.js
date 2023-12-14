import React, { useContext, useEffect, useState, useRef} from 'react'
import NoteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate} from 'react-router-dom';

const Notes = () => {
    
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {

        if(localStorage.getItem('token'))
            getNotes();
        else
            navigate('/login');
    }, []);
    
    /*useRef is used for virtully/indirectly click the button*/
    /*handle edit button and edit a note*/
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""});
    
    /*default text should be text of note which user want to edit*/
    const updateNote = (currNote)=>{
        ref.current.click();
        setNote({id:currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag});
    }
    
    /*save a updated note*/
    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    }
      
    const onChange = (e)=>{
       setNote({...note, [e.target.name]: e.target.value});
    }
   


    return (
        <>
            {/* add a new note */}
            <AddNote />
            
            {/* This is for edit a note */}

            {/* after clicking this button a modal will be opened */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label for="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="etitle" value={note.etitle} onChange={onChange}  minLength = {5} required/>
                                </div>
                                <div className="mb-3">
                                    <label for="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" name="edescription" value = {note.edescription} onChange={onChange}  minLength = {5} required/>
                                </div>
                                <div className="mb-3">
                                    <label for="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" name="etag" value = {note.etag} onChange={onChange}  minLength = {5} required/>
                                </div>
                               
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* display the all notes */}
            <div className="row my-3">
                <h2>You Notes</h2>
                <p>
                {notes.length===0 && 'No notes to display...'}
                </p>
                {notes.map((note) => {
                    return <Noteitem note={note} updateNote = {updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes