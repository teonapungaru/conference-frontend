import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import './login.sass';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';


class Login extends Component {

  state = {
    email: '',
    password: '',
    disableForm: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = () => {
    // your submit logic
  };

  setToLocalStorage = (image, imageSrc) => {
    localStorage.setItem(image, imageSrc);
  };

  getFromLocalStorage = item => {
    return localStorage.getItem(item);
  };

  render() {
    const { email, password, disableForm } = this.state;
    const re =/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const disabledLogin = !(email.length && password.length && re.test(email));
    const imageSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_J9Zwnx1awpQAmUDV3iSKtBETKRujdYMnhvEm8xIRbf3DKnkD&s';
    this.setToLocalStorage('imageSrc', imageSrc);

    return (
      <div className="container-login">
        <div className="login-form">
          <div className="login-img">
            <img className='login-image' src={this.getFromLocalStorage('imageSrc')}/>
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
                errorMessages={['this field is required', 'Email is not valid']}
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
      </div>
    )
  }
}

export default withRouter(Login);