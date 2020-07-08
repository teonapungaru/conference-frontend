import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Checkbox, FormControlLabel, TextField, Select, FormControl, MenuItem } from '@material-ui/core';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';
import SearchBar from '../SearchBar'
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';

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
      name: 'Administrator'
    },
    {
      id: 2,
      name: 'Program Committee'
    },
    {
      id: 3,
      name: 'User'
    }
  ]

  constructor(props) {
    super(props);

    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      disableForm: false,
      roles: [],
      roleId: [],
      addAnother: false
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

  updateAddAnother() {
    this.setState({ addAnother: !this.state.addAnother });
  }

  disableSubmit = () => !(this.state.firstName && this.state.lastName && this.state.email && this.state.roleId) ? true : false

  addUser = () => {
    //this.setState({ disableForm: true });
    // try {
    //   const response = await makeRequest('addUser', {
    //     data: {}
    //   });
    //   this.setState(
    //     Object.assign({}, this.initialState, {
    //       roles: this.state.roles,
    //       snackbarVariant: SNACKBAR_TYPE.success,
    //       snackbarMessage: response,
    //       openSnackbar: true
    //     }));
    // } catch (err) {
    //   this.setState({
    //     disableForm: false,
    //     snackbarMessage: err,
    //     snackbarVariant: SNACKBAR_TYPE.error,
    //     openSnackbar: true
    //   });
    // }

    console.log(this.state.addAnother, 'add')
    if (this.state.addAnother) {
      this.setState({
        lastName: '',
        firstName: '',
        email: '',
        roleId: []
      })
    } else {
      this.props.closeModal();
    }
  }

  componentDidMount() {
  }

  render() {
    console.log(this.state);
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
                  value={this.state.lastName}
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
                    <InputLabel htmlFor="select-multiple">Roles</InputLabel>
                    <Select
                      multiple
                      value={this.state.roleId}
                      onChange={this.handleChange("roleId")}
                      input={<Input id="select-multiple" />}
                      // MenuProps={MenuProps}
                      renderValue={selected => Array.prototype.join.call(selected, ', ')}
                      displayEmpty
                      disabled={this.state.disableForm}
                    >
                      {this.roles.map(item => (
                        <MenuItem value={item.name} key={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="addAnother"
                        type="checkbox"
                        disabled={this.state.disableForm}
                        onChange={() => this.updateAddAnother()}
                        checked={this.state.addAnother}
                        color="primary" />
                    }
                    label="Add another user"
                  />
                  <input color="primary"
                    className={`buttonAddUser${this.disableSubmit() ? ' disabled' : ''}`}
                    disabled={this.disableSubmit() || this.state.disableForm}
                    type="submit"
                    value="Add user"
                  />
                </div>
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

