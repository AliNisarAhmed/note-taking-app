import * as React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';
import SubmitButton from './SubmitButton';

interface RegisterPageState {
  username?: string,
  password?: string,
  password2?: string,
  isError?: boolean,
  errorMessage?: string, 
}

interface RegisterPageProps {
  history: History
}

class RegisterPage extends React.Component<RegisterPageProps, RegisterPageState> {

  state = {
    username: '',
    password: '',
    password2: '',
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
    const { username, password, password2 } = this.state;
    try {
      const response = await Axios.post('/api/auth/register', {
        username, password, password2
      });
      this.props.history.push('/login');
    } catch (error) {
      this.setState({ isError: true, errorMessage: error.response.message });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card center-align">
            <div className="card-content">
              <h2 className="left-align">Register</h2>
              <form onSubmit={this.handleFormSubmit}>
                <div className="input-field col s12">
                  <input 
                    type="text"
                    id="register-username"
                    name="username" 
                    value={this.state.username} 
                    onChange={this.handleInputChange}/>
                  <label htmlFor="register-username">Username</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="register-password"
                    name="password" 
                    value={this.state.password} 
                    onChange={this.handleInputChange} 
                  />
                  <label htmlFor="register-password">Password</label>
                </div>
                <div className="input-field col s12">
                  <input 
                    type="password"
                    id="register-password2"
                    name="password2" 
                    value={this.state.password2} 
                    onChange={this.handleInputChange} 
                  />
                  <label htmlFor="register-password2">Repeat Password</label>
                </div>
                <SubmitButton />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterPage);

