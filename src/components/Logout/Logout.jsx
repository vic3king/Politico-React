import { Component } from 'react';
import authServices from '../../services/authentication.services';

class Logout extends Component {
  componentDidMount() {
    authServices.logout();
  }

  render() {
    return null;
  }
}

export default Logout;
