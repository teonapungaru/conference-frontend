import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Dropzone from 'react-dropzone';
import logo from '../../assets/img-placeholder.png';
import fileImg from '../../assets/file_placeholder.png';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Snackbars, SNACKBAR_TYPE } from '../Snackbar';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ModalWrapped from '../Modal'
import Participants from '../Participants'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ButtonAppBar from '../ButtonAppBar/index'

import getUnixTime from 'date-fns/getUnixTime'
import toDate from 'date-fns/toDate'

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
            country: '',
            location: '',
            files: [],
            uploadedImage: logo,
            uploadText: 'Upload file',
            showUploadText: false,
            logoImage: localStorage.getItem('logoImage') || logo,
            nextClicked: false,
            prevClicked: false

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
        this.setState({ openModal: true })
    }

    handleModalClose = () => {
        this.setState({ openModal: false })
    }

    getUsers = async () => {
        const response = await makeRequest('getUsers');
        this.setState({ users: response.msg })
    }

    getConferences = async () => {
        const response = await makeRequest('getConferences');
        this.setState({ conferences: response.conferences })
    }

    loadContent = async () => {
        try {
            const promise = await Promise.all([
                this.getUsers(),
                this.getConferences()
            ]);
            if (localStorage.getItem('conferenceTitle') !== 'Add new conference') {
                const newState = this.state.conferences.filter(item => item.title === localStorage.getItem('conferenceTitle'));
                this.setState({
                    conferenceName: newState[0].title,
                    startDate: toDate(newState[0].start_date*1000),
                    endDate: toDate(newState[0].end_date*1000),
                    country: newState[0].country,
                    location: newState[0].location
                })
            }
            this.setState({ renderPage: true });
        } catch (err) {
            this.setState({ message: err, openSnackbar: true });
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    addConference = async () => {
        try {
            const response = await makeRequest('addConference', {
                data: {
                    country: this.state.country,
                    end_date: getUnixTime(this.state.endDate),
                    location: this.state.location,
                    start_date: getUnixTime(this.state.startDate),
                    title: this.state.conferenceName
                }
            });
            this.setState({
                snackbarVariant: SNACKBAR_TYPE.success,
                snackbarMessage: response.msg,
                openSnackbar: true
            });
            this.props.history.push('/home');
        } catch (err) {
            this.setState({
                disableForm: false,
                snackbarMessage: err.msg,
                snackbarVariant: SNACKBAR_TYPE.error,
                openSnackbar: true
            });
        }
    }

    nextPage = () => {
        this.setState({
            nextClicked: true,
            prevClicked: false
        })
    }
    prevPage = () => {
        this.setState({
            nextClicked: false,
            prevClicked: true
        })
    }

    render() {
        return (
            <MuiThemeProvider theme={colorScheme}>
                <div>
                    <ButtonAppBar />
                </div>
                <React.Fragment>
                    {!this.state.nextClicked &&
                        <div>
                            {this.state.conferenceName ? <p className="textAddConference">{this.state.conferenceName}</p> : <p className="textAddConference">Add New Conference</p>}
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
                            <Participants conferenceName={this.conference} users={this.state.users} />

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
                                    type="button"
                                    onClick={() => this.addConference()}
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
                <Snackbars
                    message={this.state.snackbarMessage}
                    open={this.state.openSnackbar}
                    variant={this.state.snackbarVariant}
                    handleClose={this.handleClose} />
            </MuiThemeProvider >
        )
    }
}

export default withRouter(AddConference)