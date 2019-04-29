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
      console.log(response);
      saveToken(response.data.token);
      this.props.history.push('/home');
    } catch (error) {
      console.log(error.response);
      this.setState({ isError: true, errorMessage: error.response.data.message });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card center-align">
            <div className="card-content">
              <h2 className="left-align">Login</h2>
              <form onSubmit={this.handleFormSubmit}>
                <div className="input-field col s12">
                  <input 
                    type="text" 
                    name="username" 
                    id="login-username" 
                    value={this.state.username} 
                    onChange={this.handleInputChange} 
                    className="validate"
                  />
                  <label htmlFor="login-username">Username</label>
                </div>
                <div className="input-field col s12">
                  <input 
                    type="password" 
                    name="password" 
                    id="login-password" 
                    value={this.state.password} 
                    onChange={this.handleInputChange} 
                  />
                  <label htmlFor="login-password">Password</label>
                  {this.state.isError &&
                    <span className="helper-text" data-error={this.state.isError ? "Username or Password Invalid" : ""}>Hello</span>
                  }
                </div>
                <button type="submit" className="btn waves-effect waves-light">
                  Submit
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);