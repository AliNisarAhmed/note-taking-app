var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';
import saveToken from '../helperFunctions/saveToken';
class LoginPage extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            username: '',
            password: '',
            isError: false,
            errorMessage: ''
        };
        this.handleInputChange = (e) => {
            let target = e.target;
            this.setState({
                [target.name]: target.value
            });
        };
        this.handleFormSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const { username, password } = this.state;
            try {
                const response = yield Axios.post('/api/auth/login', {
                    username, password
                });
                saveToken(response.data.token);
                this.props.history.push('/home');
            }
            catch (error) {
                console.log(error.response);
                this.setState({ isError: true, errorMessage: error.response.message });
            }
        });
    }
    render() {
        return (<form onSubmit={this.handleFormSubmit}>
        <label>Username
          <input name="username" value={this.state.username} onChange={this.handleInputChange}/>
        </label>
        <label>Password
          <input name="password" value={this.state.password} onChange={this.handleInputChange}/>
        </label>
        <button>Submit</button>
      </form>);
    }
}
export default withRouter(LoginPage);
