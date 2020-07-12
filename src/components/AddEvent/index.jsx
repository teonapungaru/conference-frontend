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
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import makeRequest from '../../service/dataservice';

import './addEvent.sass';

const colorScheme = createMuiTheme({
    palette: {
        primary: { main: 'rgb(31,75,107)' }
    },
});

class AddUser extends Component {

    eventTypes = [
        {
            id: -1,
            name: 'Social'
        },
        {
            id: 1,
            name: 'Regular Session'
        },
        {
            id: 2,
            name: 'Invited Session'
        }
    ]

    constructor(props) {
        super(props);

        this.state = {
            eventId: '',
            eventName: '',
            location: '',
            disableForm: false,
            chair: '',
            coChair: '',
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

    handleDayChange = prop => value => {
        this.setState({ [prop]: value });
    };

    disableSubmit = () => !(this.state.eventId && this.state.eventName && this.state.location && this.state.chair && this.state.coChair) ? true : false

    addEvent = () => {
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
                eventId: '',
                eventName: '',
                location: '',
                chair: '',
                coChair: ''
            })
        } else {
            this.props.closeModal();
        }
    }

    componentDidMount() {
    }

    render() {
        console.log(this.state.eventId);
        return (
            <MuiThemeProvider theme={colorScheme}>
                <React.Fragment>
                    <p className="textAddUser">Add event</p>
                    <div className="add-user-container">
                        <div className="paddingInput">
                            <ValidatorForm
                                ref="form"
                                className="form-add-user"
                                onSubmit={this.addEvent}
                                onError={errors => console.log(errors)}
                            >

                                <div className="paddingInput">
                                    <FormControl className="width">
                                        <InputLabel >Event Type</InputLabel>
                                        <Select
                                            value={this.state.eventId}
                                            onChange={this.handleChange("eventId")}
                                            displayEmpty
                                            disabled={this.state.disableForm}
                                        >
                                            {this.eventTypes.map(item => (
                                                <MenuItem value={item.id} key={item.id}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <TextValidator
                                    name="eventName"
                                    className="width"
                                    label="Event name"
                                    disabled={this.state.disableForm}
                                    value={this.state.eventName}
                                    onChange={this.handleChange('eventName')}
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
                                    name="description"
                                    className="description"
                                    label="Description"
                                    disabled={this.state.disableForm}
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                    multiline
                                />
                                <div className="day-picker">
                                    <DayPickerInput
                                        value={this.state.startDate}
                                        onDayChange={this.handleDayChange('startDate')}
                                        placeholder="Start Date"
                                        required
                                    />
                                    <DayPickerInput
                                        value={this.state.endDate}
                                        onDayChange={this.handleDayChange('endDate')}
                                        placeholder="End Date"
                                        required
                                    />
                                </div>
                                {this.state.eventId === 2 && <TextValidator
                                    name="plenarySpeakerName"
                                    className="width"
                                    label="Plenary Speaker Name"
                                    disabled={this.state.disableForm}
                                    value={this.state.plenarySpeakerName}
                                    onChange={this.handleChange('plenarySpeakerName')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                />}
                                {this.state.eventId === 2 && <TextValidator
                                    name="plenarySpeakerDescription"
                                    className="description"
                                    label="Plenary Speaker Description"
                                    disabled={this.state.disableForm}
                                    value={this.state.plenarySpeakerDescription}
                                    onChange={this.handleChange('plenarySpeakerDescription')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                    multiline
                                />}
                                <TextValidator
                                    name="chair"
                                    className="width"
                                    label="Chair"
                                    disabled={this.state.disableForm}
                                    value={this.state.chair}
                                    onChange={this.handleChange('chair')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                />
                                <TextValidator
                                    name="coChair"
                                    className="width"
                                    label="Co-Chair"
                                    disabled={this.state.disableForm}
                                    value={this.state.coChair}
                                    onChange={this.handleChange('coChair')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                />

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

