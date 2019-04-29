import * as React from 'react';
import Axios from 'axios';
import getToken from '../helperFunctions/getToken';
import { withRouter } from 'react-router';

class NewNote extends React.Component {

  state = {
    title: '',
    text: '',
  }

  handleInputChange = (e:React.ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    this.setState({
      [target.name]: target.value
    });
  };

  handleFormSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const { title, text } = this.state;
      const token = getToken();
      const response = await Axios({
        url: '/api/notes/create',
        method: 'post',
        data: {
          title, text 
        },
        headers: {
          authorization: token
        }
      });
      this.props.closeModal();
      this.props.fetchNotes();
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <div className="container">
        <h4 className="left">Create a new note</h4>
        <div className="row">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <input
                type="text"
                id="new-title"
                name="title" 
                value={this.state.title} 
                onChange={this.handleInputChange} 
                required
              />
              <label htmlFor="new-title">Note Title</label>
            </div>
            <div className="input-field">
              <textarea 
                id="textarea1"
                name="text" 
                onChange={this.handleInputChange} 
                required
                className="materialize-textarea"
                >
              </textarea>
              <label htmlFor="textarea1">Note Text</label>
            </div>
            <button className="btn">
              Done
              <i className="material-icons right">
                done
              </i>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(NewNote);
