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

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import makeRequest from '../../service/dataservice';

import './addConference.sass';
import EventCard from '../EventCard';

const colorScheme = createMuiTheme({
    palette: {
        primary: { main: 'rgb(31,75,107)' }
    },
    margin: {
        margin: 1,
    },
    extendedIcon: {
        marginRight: 2,
    },
});

const info = [
    {
        eventDays: ['01.01.2020'],
        totalParticipants: 5,
        participants: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a fringilla risus. Sed placerat vitae neque a dignissim. Donec nisi lorem, sodales egestas varius eget, convallis aliquam neque. Duis consequat, ipsum at imperdiet blandit, ligula ligula commodo dolor, eget posuere risus risus in massa. Aliquam rhoncus est et massa auctor, in mollis nunc aliquet. Praesent sapien libero, sollicitudin et porta vitae, fermentum sollicitudin ante. Fusce quis turpis interdum, cursus est non, auctor nulla. Phasellus vel maximus est. Donec augue elit, fermentum ac lectus sed, volutpat vulputate enim. Etiam finibus tristique leo non tempor. Praesent fringilla purus vel ante mattis, non auctor nulla varius.',
        address: {
            text: ['numele Cladirii/ locului etc (ex Palas)',
                'line info aditionale',
                'Strada, Nr. XXXX',
                'Cod, Oras']
        },
        times: [
            {
                event: 'Event 1',
                hours: ['00:00', '06:00']
            }
        ]
    },
    {
        eventDays: ['01.01.2020'],
        totalParticipants: 5,
        participants: 5,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a fringilla risus. Sed placerat vitae neque a dignissim. Donec nisi lorem, sodales egestas varius eget, convallis aliquam neque. Duis consequat, ipsum at imperdiet blandit, ligula ligula commodo dolor, eget posuere risus risus in massa. Aliquam rhoncus est et massa auctor, in mollis nunc aliquet. Praesent sapien libero, sollicitudin et porta vitae, fermentum sollicitudin ante. Fusce quis turpis interdum, cursus est non, auctor nulla. Phasellus vel maximus est. Donec augue elit, fermentum ac lectus sed, volutpat vulputate enim. Etiam finibus tristique leo non tempor. Praesent fringilla purus vel ante mattis, non auctor nulla varius.',
        address: {
            text: ['numele Cladirii/ locului etc (ex Palas)',
                'line info aditionale',
                'Strada, Nr. XXXX',
                'Cod, Oras']
        },
        times: [
            {
                event: 'Event 1',
                hours: ['00:00', '06:00']
            }
        ]
    }
]

class AddConference extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferenceName: '',
            startDate: '',
            endDate: '',
            files: [],
            uploadedImage: logo,
            uploadText: 'Upload file',
            showUploadText: false,
            logoImage: localStorage.getItem('logoImage') || logo,
            nextClicked: false,
            prevClicked: false

        }
    }
    conference = 'hjhbjkhb'

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

    nextPage = () => {
        this.setState({
            nextClicked: true,
            prevClicked: false
        })
        console.log(this.state)
    }
    prevPage = () => {
        this.setState({
            nextClicked: false,
            prevClicked: true
        })
    }

    render() {
        console.log(this.state)
        return (
            <MuiThemeProvider theme={colorScheme}>
                <React.Fragment>
                    {!this.state.nextClicked &&
                        <div>
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
                                </ValidatorForm>
                            </div>
                        </div>}

                    {this.state.nextClicked && this.state.conferenceName && <div className="add-conference-container">
                        <div className='participants'>
                            <p className="textAddConference">Participants</p>
                            <Participants conferenceName={this.conference} />

                            <p className="textAddConference">Events</p>
                            {/* <Button onClick={this.handleOpenModal}>Add event</Button> */}
                            <Fab size="small" color="primary" aria-label="Add" className='margin' onClick={this.handleOpenModal}>
                                <AddIcon />
                            </Fab>
                            <div className='events'>
                                {info.map(data =>
                                    <EventCard data={data} />
                                )}
                            </div>

                        </div>
                    </div>}
                    <div className="add-conference-container">
                        <div className='buttons' >
                            <div className='prev-div'>
                                {this.state.nextClicked && <Fab variant="extended" color="primary" aria-label="Next" className='fab' onClick={() => this.prevPage()} disabled={this.disableSubmit()} >
                                    <ArrowBackIcon className='next' />
                                            Back
                                    </Fab>}
                            </div>
                            <div className='next-div'>
                                {!this.state.nextClicked && <Fab variant="extended" color="primary" aria-label="Next" className='fab' onClick={() => this.nextPage()} disabled={this.disableSubmit()} >
                                    <ArrowForwardIcon className='next' />
                                            Next
                                    </Fab>}
                            </div>
                        </div>
                    </div>
                    <div className="add-conference-container">
                        <div className='participants'>
                            {
                                this.state.nextClicked && <input color="primary"
                                    className={`buttonAddConference${this.disableSubmit() ? ' disabled' : ''}`}
                                    //disabled={this.disableSubmit() || this.state.disableForm}
                                    type="submit"
                                    value="Add Conference"
                                />
                            }
                        </div>
                    </div>
                </React.Fragment >
                {
                    this.state.openModal && <ModalWrapped
                        user={false}
                        onClose={this.handleModalClose}
                        open={this.state.openModal}
                    />
                }
            </MuiThemeProvider >
        )
    }
}

export default withRouter(AddConference)