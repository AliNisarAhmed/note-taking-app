import * as React from 'react';

import { Note } from '../interfaces/Note';

interface NotesListProps {
  notes: Note[]
}

class NotesList extends React.Component<NotesListProps, {}> {
  
  
  render() {
    const { notes } = this.props;
    return (
      <div>
        {notes.length === 0 ?
          <p>No Notes, Add a note</p> :
          notes.map(note => (
            <div>
              <h4>{note.title}</h4>
              <p>{note.text}</p>
            </div>
          ))
        }
      </div>
    );
  }

}

export default NotesList;