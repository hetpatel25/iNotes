import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/noteContext';

function AddNote() {

  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  /*pass text to addNote() so note will be added in database*/
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }


  return (
    <div>
      {/* get the text from user and pass it to addNote() */}
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="title" value={note.title} onChange={onChange}  minLength = {5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="exampleInputPassword1" name="description" value={note.description} onChange={onChange}  minLength = {5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="exampleInputPassword1" name="tag" value={note.tag} onChange={onChange}  minLength = {5} required/>
        </div>
       
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
