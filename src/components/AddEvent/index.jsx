import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Checkbox, FormControlLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';
import getUnixTime from 'date-fns/getUnixTime'
import Input from '@material-ui/core/Input';
import toDate from 'date-fns/toDate'

import makeRequest from '../../service/dataservice';

import './addEvent.sass';

const colorScheme = createMuiTheme({
    palette: {
        primary: { main: 'rgb(31,75,107)' }
    },
});

class AddUser extends Component {

    ROLES = [
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
        },
        {
            id: 3,
            name: 'Plenary Session'
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
            addAnother: false,
            roles: [],
            roleId: [],
            description: '',
            startDate: new String(),
            endDate: new String()
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
        console.log('VALUEEEE', value)
        this.setState({ [prop]: value });
    };

    disableSubmit = () => {
        switch (this.state.eventId) {
            case -1: return !(this.state.eventId && this.state.roles.length && this.state.eventName && this.state.location && this.state.description && this.state.startDate && this.state.endDate) ? true : false;
            case 1:
            case 2: return !(this.state.eventId && this.state.roles.length && this.state.eventName && this.state.location && this.state.description && this.state.startDate && this.state.endDate && this.state.chair && this.state.coChair) ? true : false;
            case 3: return !(this.state.eventId && this.state.roles.length && this.state.eventName && this.state.location && this.state.description && this.state.startDate && this.state.endDate && this.state.chair && this.state.coChair && this.state.plenarySpeakerName && this.state.plenarySpeakerDescription) ? true : false;
            default: return !(this.state.eventId && this.state.roles.length && this.state.eventName && this.state.location && this.state.description && this.state.startDate && this.state.endDate && this.state.chair && this.state.coChair) ? true : false;
        }
    }

    addEvent = async () => {
        this.setState({ disableForm: true });
        let roleArray = [];
        let rolesNames = this.state.roles.map(item => roleArray.push(item.name))
        let data = {};

        switch (this.state.eventId) {
            case -1:
                data = {
                    eventId: this.state.eventId,
                    conferenceTitle: this.props.conferenceName,
                    type: this.eventTypes.filter(event => event.id === this.state.eventId ? event.name : '').reduce((prev, current) => prev || current),
                    title: this.state.eventName,
                    program: [getUnixTime(this.state.startDate), getUnixTime(this.state.endDate)],
                    location: this.state.location,
                    description: this.state.description,
                    allowed_roles: rolesNames
                };
                break;
            case 1:
            case 2:
                data = {
                    eventId: this.state.eventId,
                    conferenceTitle: this.props.conferenceName,
                    type: this.eventTypes.filter(event => event.id === this.state.eventId ? event.name : '').reduce((prev, current) => prev || current),
                    title: this.state.eventName,
                    program: [getUnixTime(this.state.startDate), getUnixTime(this.state.endDate)],
                    location: this.state.location,
                    description: this.state.description,
                    chair: this.state.chair,
                    co_chair: this.state.coChair,
                    allowed_roles: rolesNames
                };
                break;
            case 3:
                data = {
                    eventId: this.state.eventId,
                    conferenceTitle: this.props.conferenceName,
                    type: this.eventTypes.filter(event => event.id === this.state.eventId ? event.name : '').reduce((prev, current) => prev || current),
                    title: this.state.eventName,
                    program: [getUnixTime(this.state.startDate), getUnixTime(this.state.endDate)],
                    location: this.state.location,
                    description: this.state.description,
                    chair: this.state.chair,
                    co_chair: this.state.coChair,
                    allowed_roles: rolesNames,
                    plenary_speaker_name: this.state.plenarySpeakerName,
                    plenary_speaker_description: this.state.plenarySpeakerDescription
                };
                break;
        }
        try {
            const response = await makeRequest('editEvent', {
                data
            });
            this.props.eventToEdit(data);
            if (this.state.addAnother) {
                console.log('OBJECT ASSIGNS', Object.assign({}, this.initialState, {
                    snackbarVariant: SNACKBAR_TYPE.success,
                    snackbarMessage: response.msg,
                    openSnackbar: true
                }))
                this.setState(
                    Object.assign({}, this.initialState, {
                        snackbarVariant: SNACKBAR_TYPE.success,
                        snackbarMessage: response.msg,
                        openSnackbar: true
                    }))
            } else {
                this.props.closeModal();
                this.setState({
                        snackbarVariant: SNACKBAR_TYPE.success,
                        snackbarMessage: response.msg,
                        openSnackbar: true
                    });
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

        const { allowed_roles: roles, chair, co_chair: coChair, description, type, location, program, title: eventName } = this.props.editEvent;
        const eventId = Object.keys(this.props.editEvent).length && type['id'];
        const startDate = Object.keys(this.props.editEvent).length && toDate(program[0] * 1000);
        const endDate = Object.keys(this.props.editEvent).length && toDate(program[1] * 1000);
        Object.keys(this.props.editEvent).length && this.setState({
            roles: roles.reduce((acc, item) => {
                acc.push(this.ROLES[item].name);
                return acc;
            }, []),
            chair,
            coChair,
            description,
            eventId,
            location,
            startDate,
            endDate,
            eventName
        })
    }

    render() {
        console.log('this.state.startDate', this.state.startDate )
        return (
            <MuiThemeProvider theme={colorScheme}>
                <React.Fragment>
                    {Object.keys(this.props.editEvent).length ? <p className="textAddUser">Edit event {this.props.editEvent.title}</p> : <p className="textAddUser">Add event</p>}
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
                                <div className="paddingInput">
                                    <FormControl className="width">
                                        <InputLabel htmlFor="select-multiple">Allowed Roles</InputLabel>
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
                                            {this.ROLES.map(item => (
                                                <MenuItem value={item.name} key={item.id}>
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
                                {this.state.eventId === 3 && <TextValidator
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
                                {this.state.eventId === 3 && <TextValidator
                                    name="plenarySpeakerDescription"
                                    className="description"
                                    label="Plenary Speaker Description"
                                    disabled={this.state.disableForm}
                                    value={this.state.plenarySpeakerDescription}
                                    onChange={this.handleChange('plenarySpeakerDescription')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                />}
                                {this.state.eventId !== -1 && <TextValidator
                                    name="chair"
                                    className="width"
                                    label="Chair"
                                    disabled={this.state.disableForm}
                                    value={this.state.chair}
                                    onChange={this.handleChange('chair')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                />}
                                {this.state.eventId !== -1 && <TextValidator
                                    name="coChair"
                                    className="width"
                                    label="Co-Chair"
                                    disabled={this.state.disableForm}
                                    value={this.state.coChair}
                                    onChange={this.handleChange('coChair')}
                                    validators={['required']}
                                    errorMessages={['This field is required']}
                                    required
                                />}

                                <div>
                                    {!Object.keys(this.props.editEvent).length && <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="addAnother"
                                                type="checkbox"
                                                disabled={this.state.disableForm}
                                                onChange={() => this.updateAddAnother()}
                                                checked={this.state.addAnother}
                                                color="primary" />
                                        }
                                        label="Add another event"
                                    />}
                                    <input color="primary"
                                        className={`buttonAddUser${this.disableSubmit() ? ' disabled' : ''}`}
                                        disabled={this.disableSubmit() || this.state.disableForm}
                                        type="submit"
                                        value={Object.keys(this.props.editEvent).length ? "Submit changes" : 'Add event'}
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

