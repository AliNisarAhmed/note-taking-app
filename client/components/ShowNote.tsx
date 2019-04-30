import React from 'react'
import { Note } from '../interfaces/Note';

interface ShowModalProps {
  note: Note,
  closeModal: Function,
  handleNoteDelete: Function,
  handleEdit: Function,
}

export default function ShowNote({ note, closeModal, handleNoteDelete, handleEdit }: ShowModalProps) {
  return (
    <div className="container">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">{note.title}</span>
          <p className="flow-text">{note.text}</p>
        </div>
        <div className="card-action">
          <button 
            className="blue-text btn-flat"
            onClick={handleEdit}
          >
            Edit
            <i className="material-icons left">
              edit
            </i>
          </button>
          <button 
            className="red-text text-lighten-2 btn-flat waves-effect" 
            onClick={() => handleNoteDelete(note._id)}
          >
            Delete
            <i className="material-icons left">
              delete
            </i>
          </button>
          <button 
            className="green-text right btn-flat" 
            onClick={() => closeModal()}
          >
            Close
            <i className="material-icons left">
              close
            </i>
          </button>
        </div>
      </div>
    </div>
  )
}
