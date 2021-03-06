import React, { Component } from 'react';

interface NoteComponentProps {
  handleNoteClick: Function,
  noteId: string,
  noteTitle: string,
  text: string,
}

export default class NoteComponent extends Component<NoteComponentProps, {}> {
  
  handleClick = () => {
    this.props.handleNoteClick(this.props.noteId);
  }
  
  render() {
    return (
      <div
        onClick={this.handleClick}
        className="col s6 m4 l3 note"
      >
        <div
          className="card blue-grey darken-1"
        >
          <div className="card-content white-text">
            <span className="card-title truncate">{this.props.noteTitle}</span>
            <p className="truncate">{this.props.text}</p>
          </div>
        </div>
      </div>
    );
  }
}
