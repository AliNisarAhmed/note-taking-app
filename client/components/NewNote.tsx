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
      this.props.fetchNotes(token);
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Title
          <input name="title" value={this.state.title} onChange={this.handleInputChange} required/>
        </label>
        <label>
          <textarea name="text" cols="30" rows="10" onChange={this.handleInputChange} required></textarea>
        </label>
        <button>Create Note</button>
      </form>
    )
  }
}

export default withRouter(NewNote);
