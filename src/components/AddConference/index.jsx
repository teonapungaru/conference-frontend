import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Checkbox, FormControlLabel, TextField, Select, FormControl, MenuItem } from '@material-ui/core';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';

//import { TimeInput } from "material-ui-time-picker";

import makeRequest from '../../service/dataservice';

import './addConference.sass';

const colorScheme = createMuiTheme({
    palette: {
        primary: { main: 'rgb(31,75,107)' }
    },
});

class AddConference extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferenceName: '',
        }
    }

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    };

    disableSubmit = () => !(this.state.conferenceName) ? true : false

    render() {
        return (
            <MuiThemeProvider theme={colorScheme}>
                <React.Fragment>
                    <p className="textAddUser">Add New Conference</p>
                    <div className="add-user-container">
                        <ValidatorForm
                            ref="form"
                            className="form-add-user"
                            onSubmit={this.addConference}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                name="conferenceName"
                                className="width"
                                label="Conference Name"
                                disabled={this.state.disableForm}
                                value={this.state.conferenceName}
                                onChange={this.handleChange('conferenceName')}
                                validators={['required']}
                                errorMessages={['This field is required']}
                                required
                            />
                            <TextValidator
                                name="location"
                                className="width"
                                label="Location"
                                disabled={this.state.disableForm}
                                value={this.state.location}
                                onChange={this.handleChange('location')}
                                validators={['required']}
                                errorMessages={['This field is required']}
                                required
                            />
                            <TextValidator
                                name="country"
                                className="width"
                                label="Location"
                                disabled={this.state.disableForm}
                                value={this.state.country}
                                onChange={this.handleChange('country')}
                                validators={['required']}
                                errorMessages={['This field is required']}
                                required
                            />
                            <DayPickerInput
                                placeholder="Start Date"
                                required
                            />
                            <DayPickerInput
                                placeholder="End Date"
                                required
                            />

                            <input color="primary"
                                className={`buttonAddUser${this.disableSubmit() ? ' disabled' : ''}`}
                                //disabled={this.disableSubmit() || this.state.disableForm}
                                type="submit"
                                value="Add Conference"
                            />
                        </ValidatorForm>
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(AddConference)