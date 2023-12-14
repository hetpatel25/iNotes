import NoteContext from "./noteContext";
import { useState } from "react";
import { baseUrl } from '../../shared';


const NoteState = (props) => {

  // const host = "http://localhost:5000";


  const [notes, setNotes] = useState([]);/*main state*/

  /*get all notes*/
  const getNotes = async () => {

    /*fetch api*/
    try {

      props.setProgress(30);
      const response = await fetch(`${baseUrl}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      const json = await response.json();
      // console.log(json);
      setNotes(json);
    } catch (error) {
      props.createNotification('warning', 'Failed to fetch notes');
    } finally {
      props.setProgress(100);
    }


  }


  /*add a note*/
  const addNote = async (title, description, tag) => {

    /*fetch api*/
    try {
      props.setProgress(30);
      const response = await fetch(`${baseUrl}/api/notes/addnote`, {
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
      if (note) {
        setNotes(notes.concat(note));
        props.createNotification('success', 'note added');
      } else {
        props.createNotification('warning', 'Failed to add note');
      }


    } catch (error) {
      props.createNotification('warning', 'Failed to add note');
    } finally {
      props.setProgress(100);
    }


  }

  /*delete a note*/
  const deleteNote = async (id) => {

    /*fetch api - delete in database*/
    try {
      props.setProgress(30);

      const response = await fetch(`${baseUrl}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      const json = await response.json();

      /*delete in frontend*/
      const newNotes = notes.filter((note) => { return note._id !== id });
      props.createNotification('success', 'note deleted');
      setNotes(newNotes);
    } catch (error) {
      props.createNotification('warning', 'Failed to delete note');
    } finally {
      props.setProgress(100);
    }


  }

  /*edit a note*/
  const editNote = async (id, title, description, tag) => {

    /*fetch api- update in backend*/
    try {
      props.setProgress(30);
      const response = await fetch(`${baseUrl}/api/notes/updatenote/${id}`, {
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
      props.createNotification('success', 'note updated');
    } catch (error) {
      props.createNotification('warning', 'Failed to update note');
    } finally {
      props.setProgress(100);
    }


  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;