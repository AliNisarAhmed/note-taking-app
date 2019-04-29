import * as React from 'react';

import { Note } from '../interfaces/Note';

import NoteComponent from './NoteComponent';

interface NotesListProps {
  notes: Note[]
}

class NotesList extends React.Component<NotesListProps, {}> {
  
  render() {
    const { notes } = this.props;
    return (
      <div className="row">
        {notes.length === 0 ?
          <p>No Notes, Add a note</p> :
          notes.map(note => (
            <NoteComponent
              handleNoteClick={this.props.handNoteClick}
              text={note.text}
              noteTitle={note.title}
              noteId={note._id}
            />
            
          ))
        }
      </div>
    );
  }

}

export default NotesList;