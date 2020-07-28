import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import './login.sass';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Snackbars, SNACKBAR_TYPE} from '../../Snackbar';
import ConferenceLogo from '../../../assets/Logo-ICSTCC-2020-main.svg'

import makeRequest from '../../../service/dataservice'


class Login extends Component {

  state = {
    email: '',
    password: '',
    disableForm: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClose = () => {
    this.setState({ openSnackbar: false });
  }

  handleSubmit = async (event) => {

    console.disableYellowBox = true;
    const concatCred = `${this.state.email}:${this.state.password}`;
    const credentials = btoa(concatCred);

    try {
      const response = await makeRequest('signin', { data: { credentials }});

      localStorage.setItem('token', response.access_token);
      this.props.history.push('/welcome');
    } catch (err) {
      this.setState({
        disableForm: false,
        snackbarMessage: err,
        snackbarVariant: SNACKBAR_TYPE.error,
        openSnackbar: true
      })
    }
  };

  setToLocalStorage = (image, imageSrc) => {
    localStorage.setItem(image, imageSrc);
  };

  getFromLocalStorage = item => {
    return localStorage.getItem(item);
  };

  render() {
    const { email, password, disableForm } = this.state;
    const re =/^\w.*\d*@\w+\.\w+$/;
    const disabledLogin = !(email.length && password.length && re.test(email));
    const imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_J9Zwnx1awpQAmUDV3iSKtBETKRujdYMnhvEm8xIRbf3DKnkD&s';
    this.setToLocalStorage('imageSrc', imageSrc);

    return (
      <div className="container-login">
        <div className="login-form">
          <div className="login-img">
            <img alt="Conference Logo" className='login-image' src={ConferenceLogo}/>
          </div>
          <div className="login-inputs">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}
              className='form-login'
            >
              <TextValidator
                className='email-validator'
                label="Email"
                onChange={this.handleChange('email')}
                name="email"
                type="email"
                value={email}
                disabled={disableForm}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'E-mail format is invalid ']}
                required
              />
              <TextValidator
                className='password-validator'
                name="password"
                value={password}
                label="Password"
                type="password"
                disabled={disableForm}
                onChange={this.handleChange('password')}
                validators={['required']}
                errorMessages={['This field is required']}
                required
              />
              <input color="primary"
                     className={`buttonLogin${disabledLogin ? ' disabled' : ''}`}
                     disabled={disabledLogin || disableForm}
                     type="submit"
                     value="LOGIN"
              />
            </ValidatorForm>
          </div>
        </div>
        <Snackbars
          message={this.state.snackbarMessage}
          open={this.state.openSnackbar}
          variant={this.state.snackbarVariant}
          handleClose={this.handleClose} />
      </div>
    )
  }
}

export default withRouter(Login);