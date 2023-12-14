import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";

 
  const [notes, setNotes] = useState([]);/*main state*/

  /*get all notes*/
  const getNotes = async () => {

    /*fetch api*/
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });

    const json = await response.json();
    // console.log(json);
    setNotes(json);

  }


  /*add a note*/
  const addNote = async (title, description, tag) => {
 
    /*fetch api*/
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });

    // console.log("Adding a new note")
    const note = await response.json();
    // console.log(note);
    setNotes(notes.concat(note))

  }

  /*delete a note*/
  const deleteNote = async (id) => {

    /*fetch api - delete in database*/
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json();

    /*delete in frontend*/
    const newNotes = notes.filter((note) => { return note._id !== id });

    setNotes(newNotes);

  }

  /*edit a note*/
  const editNote = async (id, title, description, tag) => {

    /*fetch api- update in backend*/
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    /*update notes in frontend*/
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }

    setNotes(newNotes);

  }





  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;