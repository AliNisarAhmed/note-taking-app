import * as React from 'react';
import Axios from 'axios';

interface LoginPageState {
  username?: string,
  password?: string,
  isError?: boolean,
}

export default class LoginPage extends React.Component<{}, LoginPageState> {
  
  state = {
    username: '',
    password: '',
    isError: false,
  }

  handleInputChange = (e:React.ChangeEvent) => {
    let target = e.target as HTMLInputElement;
    this.setState({
      [target.name]: target.value
    });
  };

  handleFormSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const { username, password } = this.state;
    try {
      const response = await Axios.post('/api/auth/login', {
        username, password
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
      this.setState({isError: true});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>Username
          <input name="username" value={this.state.username} onChange={this.handleInputChange}/>
        </label>
        <label>Password
          <input name="password" value={this.state.password} onChange={this.handleInputChange} />
        </label>
        <button>Submit</button>
      </form>
    );
  }
}