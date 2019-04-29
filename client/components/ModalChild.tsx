import * as React from 'react';

import NewNote from './NewNote';

class ModalChild extends React.Component {


  render() {
    if (this.props.modalMode === "new") {
      return <NewNote closeModal={this.props.closeModal} fetchNotes={this.props.fetchNotes}/>
    } 
    else if (this.props.modalMode === "show") {
      let note = this.props.notes.find(note => note._id === this.props.clickedNoteId);
      return (
        <div className="container">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">{note.title}</span>
              <p className="flow-text">{note.text}</p>
            </div>
            <div className="card-action">
              <button className="blue-text btn-flat">
                Edit
                <i className="material-icons left">
                  edit
                </i>
              </button>
              <button 
                className="red-text text-lighten-2 btn-flat waves-effect" 
                onClick={() => this.props.handleNoteDelete(note._id)}
              >
                Delete
                <i className="material-icons left">
                  delete
                </i>
              </button>
              <button 
                className="green-text right btn-flat" 
                onClick={() => this.props.closeModal()}
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
    else {
      <div>MODAL UPDATE</div>
    }
  }
}

export default ModalChild;
