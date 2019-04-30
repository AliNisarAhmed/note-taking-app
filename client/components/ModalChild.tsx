import * as React from 'react';

import { Note } from '../interfaces/Note';
import { ModalModes } from '../interfaces/ModalModes';

import NewNote from './NewNote';
import ShowNote from './ShowNote';

interface ModalChildProps {
  modalMode: ModalModes,
  closeModal: Function,
  fetchNotes: Function,
  handleNoteDelete: Function,
  clickedNoteId: string,
  notes: Note[]
}

class ModalChild extends React.Component<ModalChildProps, {}> {

  render() {
    if (this.props.modalMode === "new") {
      return <NewNote closeModal={this.props.closeModal} fetchNotes={this.props.fetchNotes}/>
    } 
    else if (this.props.modalMode === "show") {
      let note = this.props.notes.find(note => note._id === this.props.clickedNoteId) as Note;
      return (
        <ShowNote 
          note={note} 
          closeModal={this.props.closeModal} 
          handleNoteDelete={this.props.handleNoteDelete} 
        />
      )
    } 
    else {
      <div>MODAL UPDATE</div>
    }
  }
}

export default ModalChild;
