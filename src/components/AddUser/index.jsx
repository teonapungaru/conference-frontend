import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Checkbox, FormControlLabel, TextField, Select, FormControl, MenuItem } from '@material-ui/core';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';
import SearchBar from '../SearchBar'

import makeRequest from '../../service/dataservice';

import './addUser.sass';

const colorScheme = createMuiTheme({
  palette: {
    primary: { main: 'rgb(31,75,107)' }
  },
});

class AddUser extends Component {

  roles = [
    {
      id: 1,
      name:'Participant'
    },
    {
      id: 2,
      name: 'Admin'
    },
    {
      id: 3,
      name: 'Speaker'
    }
  ]

  constructor(props) {
    super(props);

    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      disableForm: false,
      //role: this.roles[0].name,
      roleId: this.roles[0].id
    }

    this.initialState = this.state;
  }

  handleClose = () => {
    this.setState({ openSnackbar: false });
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  updateIsActiveValue() {
    this.setState({ isActive: !this.state.isActive });
  }

  disableSubmit = () => !(this.state.firstName && this.state.lastName && this.state.email && this.state.roleId) ? true : false

  addUser = async () => {
    this.setState({ disableForm: true });
    try {
      const response = await makeRequest('addUser', {
        data: {}
      });
      this.setState(
        Object.assign({}, this.initialState, {
          roles: this.state.roles,
          snackbarVariant: SNACKBAR_TYPE.success,
          snackbarMessage: response,
          openSnackbar: true
        }));
    } catch (err) {
      this.setState({
        disableForm: false,
        snackbarMessage: err,
        snackbarVariant: SNACKBAR_TYPE.error,
        openSnackbar: true
      });
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <MuiThemeProvider theme={colorScheme}>
        <React.Fragment>
          <p className="textAddUser">Add user</p>
          <div className="add-user-container">
            <div className="search">
              <SearchBar />
            </div>
          <div className="paddingInput">
            <ValidatorForm
              ref="form"
              className="form-add-user"
              onSubmit={this.addUser}
              onError={errors => console.log(errors)}
            >
              <TextValidator
                name="lastName"
                className="width"
                label="Last name"
                disabled={this.state.disableForm}
                value={this.state.kid}
                onChange={this.handleChange('lastName')}
                validators={['required']}
                errorMessages={['This field is required']}
                required
              />
              <TextValidator
                name="firstName"
                className="width"
                label="First name"
                disabled={this.state.disableForm}
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                validators={['required']}
                errorMessages={['This field is required']}
                required
              />
              <TextValidator
                name="email"
                className="width"
                label="Email"
                disabled={this.state.disableForm}
                value={this.state.email}
                onChange={this.handleChange('email')}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
                required
              />
              <div className="paddingInput">
                <FormControl className="width">
                  <Select
                    value={this.state.roleId}
                    onChange={this.handleChange("roleId")}
                    displayEmpty
                    disabled={this.state.disableForm}
                  >
                    <MenuItem value="" disabled>
                      Roles
                    </MenuItem>
                    {this.roles.map(item => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            
              <input color="primary"
                className={`buttonAddUser${this.disableSubmit() ? ' disabled' : ''}`}
                disabled={this.disableSubmit() || this.state.disableForm}
                type="submit"
                value="Add user"
              />
            </ValidatorForm>
            </div>
          </div>
        </React.Fragment>
        <Snackbars
          message={this.state.snackbarMessage}
          open={this.state.openSnackbar}
          variant={this.state.snackbarVariant}
          handleClose={this.handleClose} />
      </MuiThemeProvider>
    )
  }
}

export default withRouter(AddUser);

