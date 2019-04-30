import React, { Component } from 'react';
import { Note } from '../interfaces/Note';
import SubmitButton from './SubmitButton';



interface UpdateNoteProps {
  note: Note,
  closeModal: Function,
  handleNoteUpdate: Function,
}

interface UpdateNoteState {
  title?: string,
  text?: string,
}

export default class UpdateNote extends Component<UpdateNoteProps, UpdateNoteState> {
  
  state = {
    title: '',
    text: '',
  }

  componentDidMount() {
    const { text, title } = this.props.note;
    this.setState({ text, title });
  }

  handleInputChange = (e: React.ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    this.setState({
      [target.name]: target.value 
    })
  }

  handleFormSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const { title, text } = this.state;
    this.props.handleNoteUpdate(this.props.note._id, { title, text });
    this.props.closeModal();
  }
  
  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="input-field col s12">
          <input 
            type="text" 
            name="title" 
            id="update-title" 
            value={this.state.title} 
            onChange={this.handleInputChange} 
            className="validate"
          />
          <label className="active" htmlFor="update-title">Title</label>
        </div>
        <div className="input-field col s12">
          <textarea 
            name="text" 
            id="update-text" 
            className="materialize-textarea"
            value={this.state.text}
            onChange={this.handleInputChange}
          >
          </textarea>
          <label className="active" htmlFor="update-text">Text</label>
        </div>
        <SubmitButton />
        <button onClick={() => this.props.closeModal()} className="red btn">Cancel</button>
      </form>
    )
  }
}
