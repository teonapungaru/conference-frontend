import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Checkbox, FormControlLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';
import SearchBar from '../SearchBar'
import Input from '@material-ui/core/Input';
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

  educationalTitles = [
    {
      id: 1,
      name: 'Teaching Assistant'
    },
    {
      id: 2,
      name: 'Assistent Professor/Lecturer'
    },
    {
      id: 3,
      name: 'Associate Professor/Senior Lecturer'
    },
    {
      id: 4,
      name: 'Professor'
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
      addAnother: false,
      isPhd: false,
      notPhd: false,
      eduTitle: ''
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

  updateisPhd(isPhd) {
    this.setState({ isPhd, notPhd: !isPhd})
  }

  disableSubmit = () => !(this.state.firstName && this.state.lastName && this.state.email) ? true : false

  updateUser = async () => {
    //event.preventDefault();
    const editingUser = !!Object.keys(this.props.editUser).length;
    let roleArray = [];
    let rolesId = this.state.roles.map(item => roleArray.push(item.id))
    this.setState({ disableForm: true });
    const userDetails = {
      username: this.state.email,
      password: btoa('12345678'),
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      roles: rolesId,
      conference_id: this.props.conferenceId,
      valid_account: 1,
      is_phd: this.state.isPhd,
      educational_title: this.state.eduTitle
    }

    try {
      const response = await makeRequest(editingUser ? 'editUser' : 'addUser', {
        data: userDetails
      });
      this.props.onEdit(userDetails);
      if (this.state.addAnother) {
        this.setState(
          Object.assign({}, this.initialState, {
            snackbarVariant: SNACKBAR_TYPE.success,
            snackbarMessage: response.msg,
            openSnackbar: true
          }))
      } else {
        this.props.closeModal();
      }
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
    const { educational_title: eduTitle, first_name: firstName, is_phd: isPhd, last_name: lastName, roles, username: email } = this.props.editUser;
    Object.keys(this.props.editUser).length && this.setState({
        eduTitle,
        firstName,
        lastName,
        isPhd,
        roles: roles.split(', '),
        email
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={colorScheme}>
        <React.Fragment>
          {Object.keys(this.props.editUser).length ? <p className="textAddUser">Edit user {this.props.editUser.last_name}</p> : <p className="textAddUser">Add user</p>}
          <div className="add-user-container">
            <div className="search">
              <SearchBar />
            </div>
            {/* <div className="paddingInput"> */}
            <ValidatorForm
              ref="form"
              className="form-add-user"
              onSubmit={this.updateUser}
              onError={errors => console.log(errors)}
            >
              <div className="paddingInput">
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
              </div>
              <div className="paddingInput">
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
              </div>
              <div className="paddingInput">
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
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPhd"
                    type="checkbox"
                    disabled={this.state.disableForm}
                    onChange={() => this.updateisPhd(true)}
                    checked={!!this.state.isPhd}
                    color="primary" />
                }
                label="Phd"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="notPhd"
                    type="checkbox"
                    disabled={this.state.disableForm}
                    onChange={() => this.updateisPhd(false)}
                    checked={this.state.notPhd}
                    color="primary" />
                }
                label="Not Phd ???? am uitat"
              />
              {/* <div className="paddingInput"> */}
              <FormControl className="width">
                <InputLabel >Educational Title</InputLabel>
                <Select
                  value={this.state.eduTitle}
                  onChange={this.handleChange("eduTitle")}
                  displayEmpty
                  disabled={this.state.disableForm}
                >
                  {this.educationalTitles.map(item => (
                    <MenuItem value={item.name} key={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* </div> */}
              <div className="paddingInput">
                <FormControl className="width">
                  <InputLabel htmlFor="select-multiple">Roles</InputLabel>
                  <Select
                    multiple
                    value={this.state.roles}
                    onChange={this.handleChange("roles")}
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
            {/* </div> */}
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

