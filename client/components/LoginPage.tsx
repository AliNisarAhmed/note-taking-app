import * as React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';
import saveToken from '../helperFunctions/saveToken';

interface LoginPageState {
  username?: string,
  password?: string,
  isError?: boolean,
  errorMessage?: string,
}

interface LoginPageProps {
  history: any
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  
  state = {
    username: '',
    password: '',
    isError: false,
    errorMessage: ''
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
      saveToken(response.data.token);
      this.props.history.push('/home');
    } catch (error) {
      console.log(error.response);
      this.setState({ isError: true, errorMessage: error.response.message });
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

export default withRouter(LoginPage);