import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Dropzone from 'react-dropzone';
import logo from '../../assets/img-placeholder.png';
import fileImg from '../../assets/file_placeholder.png';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Checkbox, FormControlLabel, TextField, Select, FormControl, MenuItem } from '@material-ui/core';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';
import ModalWrapped from '../Modal'
import Button from '@material-ui/core/Button';
import Participants from '../Participants'

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
            conferenceId: '',
            conferenceName: '',
            startDate: '',
            endDate: '',
            files: [],
            uploadedImage: logo,
            uploadText: 'Upload file',
            showUploadText: false,
            logoImage: localStorage.getItem('logoImage') || logo,

        }
    }

    onDrop(files) {
        this.setState({ uploadText: 'Uploading', showUploadText: true })
        //this.uploadImage(files[0]);
    }

    onCancel() {
        console.log('onCancel');
        this.setState({
            files: []
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = prop => event => {
        this.setState({
            [prop]: event.target.value
        });
    };

    handleDayChange = prop => value => {
        this.setState({ [prop]: value });
    };

    disableSubmit = () => !(this.state.conferenceName) ? true : false

    handleOpenModal = () => {
        console.log('bla')
        this.setState({ openModal: true })
    }

    handleModalClose = () => {
        this.setState({ openModal: false })
    }

    addConference = () => {
        console.log(this.state)
    }

    render() {
        console.log(this.state.openModal)
        return (
            <MuiThemeProvider theme={colorScheme}>
                <React.Fragment>
                    <p className="textAddConference">Add New Conference</p>
                    <div className="add-conference-container">
                        <div className="dropzone-parent">
                            <Dropzone
                                className="dropzone"
                                accept="image/jpeg, image/png"
                                multiple={false}
                                onDrop={this.onDrop.bind(this)}
                                onFileDialogCancel={this.onCancel.bind(this)}
                            >
                                <div className="logo">
                                    <p>Logo</p>
                                    <img src={this.state.logoImage} width="150" height="150" alt="Logo" />
                                    <span className={this.state.showUploadText ? "show" : ""}>{this.state.uploadText}</span>
                                </div>
                            </Dropzone>
                            <Dropzone
                                className="dropzone"
                                accept=".txt, .doc"
                                multiple={false}
                                onDrop={this.onDrop.bind(this)}
                                onFileDialogCancel={this.onCancel.bind(this)}
                            >
                                <div className="logo">
                                    <p>Description</p>
                                    <img src={fileImg} width="150" height="150" alt="File" />
                                    <span className={this.state.showUploadText ? "show" : ""}>{this.state.uploadText}</span>
                                </div>
                            </Dropzone>
                        </div>
                        <ValidatorForm
                            ref="form"
                            className="form-add-conference"
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
                                label="Country"
                                disabled={this.state.disableForm}
                                value={this.state.country}
                                onChange={this.handleChange('country')}
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

                            <p className="textAddConference">Participants</p>
                            <Participants />

                            <p className="textAddConference">Events</p>
                            <Button onClick={this.handleOpenModal}>Add event</Button>

                            <input color="primary"
                                className={`buttonAddConference${this.disableSubmit() ? ' disabled' : ''}`}
                                //disabled={this.disableSubmit() || this.state.disableForm}
                                type="submit"
                                value="Add Conference"
                            />
                        </ValidatorForm>
                    </div>
                </React.Fragment>
                {this.state.openModal && <ModalWrapped
                    user={false}
                    onClose={this.handleModalClose}
                    open={this.state.openModal}
                />}
            </MuiThemeProvider>
        )
    }
}

export default withRouter(AddConference)