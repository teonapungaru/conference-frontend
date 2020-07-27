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

const roles = {
    1: 'Administrator',
    2: 'Program Committee',
    3: 'User'
};

const editEvent = {}

class AddConference extends Component {

    constructor(props) {
        super(props);

        this.state = {
            conferenceId: '',
            conferenceName: '',
            startDate: '',
            endDate: '',
            country: '',
            location: '',
            files: [],
            uploadText: 'Upload file',
            showUploadText: false,
            logoImage: localStorage.getItem('logoImage') || logo,
            nextClicked: false,
            prevClicked: false

        }

        this.initialState = this.state;
        this.newState = [];
    }

    onDropImage(files) {
        this.setState({ uploadText: 'Uploading', showUploadText: true })
        this.uploadImage(files[0]);
    }

    onDropText(text) {
        this.setState({ uploadText: 'Uploading', showUploadText: true })
        //this.uploadImage(files[0]);
    }

    onCancel() {
        this.setState({
            files: []
        });
    }

    uploadImage = async (file) => {
        let version = Math.floor((Math.random() * 100) + 1);
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData, ' FILEEE')
        const requestOptions = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }

        try {
            const response = await makeRequest('addConferenceLogo', requestOptions);
            // localStorage.setItem('logoImage', response.msg);
            this.setState({ logoImage: file, showUploadText: false, uploadText: 'Upload photo' });
        } catch (err) {
            //   this.setState({
            //     snackbarVariant: SNACKBAR_TYPE.error,
            //     snackbarMessage: err,
            //     openSnackbar: true,
            //     showUploadText: false,
            //     uploadText: 'Upload photo'
            //   });
        }

         this.getLogo();
    };

    getLogo = async () => {
        const baseUri = `${this.state.conferenceName}/${this.state.conferenceName}_conference_logo.png`;
        try {
            const test = await makeRequest('getLogo', baseUri);
            this.setState({ logoImage: JSON.stringify(test) });
            localStorage.setItem('logoImage', JSON.stringify(test));
        } catch {
            this.setState({ logoImage: logo });
        }
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

    getEvents = async () => {
        const response = await makeRequest('getEvents', this.state.conferenceName);
        this.setState({ events: response.sessions })
    }

    filterUsers = (users) =>
        users.filter(user => user.roles.length && user.roles.every(elem => elem.conference_id === this.state.conferenceId))
            .map(filteredUser => {
                const filteredUserRoles = [...filteredUser.roles]
                let rolesToReturn = '';
                if (filteredUserRoles.length === 1) {
                    rolesToReturn = roles[filteredUserRoles[0]['role_id']]
                } else if (filteredUserRoles.length > 1) {
                    filteredUserRoles.forEach((role, roleIdx) => {
                        const { role_id: roleId } = role;
                        if (roleIdx !== filteredUserRoles.length - 1) {
                            rolesToReturn += roles[roleId] + ', ';
                            return;
                        }
                        rolesToReturn += roles[roleId];
                    })
                }

                filteredUser.roles = rolesToReturn;
                return filteredUser;
            })

    changeOccurred = (user) => {
        let newRoles = user.roles.map(roleId => roles[roleId])
        user.roles = newRoles.join(', ');
        let newUsers = [...this.state.users.filter(item => item.username !== user.username), user]
        this.setState({ users: newUsers })
    }

    editEvent = (event) => {
        let newEvents = [...this.state.events.filter(item => item.title !== event.title), event]
        this.setState({ events: newEvents.reverse() })
    }

    getConferences = async () => {
        const response = await makeRequest('getConferences');
        this.setState({ conferences: response.conferences })
    }

    loadContent = async () => {
        try {
            const promise = await Promise.all([
                this.getUsers(),
                this.getConferences(),
            ]);
            if (localStorage.getItem('conferenceTitle') !== 'Add new conference') {
                this.newState = this.state.conferences.filter(item => item.title === localStorage.getItem('conferenceTitle'));
                this.setState({
                    conferenceId: this.newState[0].id,
                    conferenceName: this.newState[0].title,
                    startDate: toDate(this.newState[0].start_date * 1000),
                    endDate: toDate(this.newState[0].end_date * 1000),
                    country: this.newState[0].country,
                    location: this.newState[0].location,
                    logoImage: this.newState[0].path_to_logo
                })
            }
            const filteredUsers = this.filterUsers(this.state.users);
            this.state.conferenceName && this.getEvents()
            localStorage.getItem('logoImage') && this.getLogo()
            this.setState({ renderPage: true, users: filteredUsers });
        } catch (err) {
            //this.setState({ message: err, openSnackbar: true });
        };
    }

    componentDidMount() {
        this.loadContent();
    }

    goToHome = () => {
        this.props.hisory.push('/welcome');
    }

    editConference = async () => {
        try {
            const response = await makeRequest('editConference', {
                data: {
                    country: this.state.country,
                    end_date: getUnixTime(this.state.endDate),
                    location: this.state.location,
                    path_to_description: '',
                    path_to_logo: localStorage.getItem('logoImage'),
                    start_date: getUnixTime(this.state.startDate),
                    title: this.state.conferenceName
                }
            });
        } catch (err) {
            this.setState({
                disableForm: false,
                snackbarMessage: err.msg,
                snackbarVariant: SNACKBAR_TYPE.error,
                openSnackbar: true
            });
        }
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
                conferenceId: response.msg.id,
                conferenceName: response.msg.title,
                startDate: toDate(response.msg.start_date * 1000),
                endDate: toDate(response.msg.end_date * 1000),
                country: response.msg.country,
                location: response.msg.location
            });
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
        const { conferenceId, conferenceName, startDate, endDate, country, location } = this.state;
        const { conferenceId: initId, conferenceName: initName, startDate: initStart, endDate: initEnd, country: initCountry, location: initLocation } = this.initialState;
        if (!this.newState[0]) {
            this.addConference();
        } else {
            const { id: newId, title: newName, start_date: newStart, end_date: newEnd, country: newCountry, location: newLocation } = this.newState[0];
            if (conferenceId !== newId || conferenceName !== newName || getUnixTime(startDate) !== newStart || getUnixTime(endDate) !== newEnd || country !== newCountry || location !== newLocation || localStorage.getItem('logo')) {
                this.editConference();
            }
        }
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

    updateAfterDelete = (eventID) => {
        this.setState({
            events: JSON.parse(JSON.stringify(this.state.events.filter(event => event.eventId !== eventID)))
        })
    }

    render() {
        console.log('imageeeeeeee ', this.state.logoImage)
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
                                        onDrop={this.onDropImage.bind(this)}
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
                                        onDrop={this.onDropText.bind(this)}
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
                            <Participants conferenceId={this.state.conferenceId} users={this.state.users} changeOccurred={this.changeOccurred} />

                            <p className="textAddConference">Events</p>
                            {/* <Button onClick={this.handleOpenModal}>Add event</Button> */}
                            <Fab size="small" color="primary" aria-label="Add" className='margin' onClick={this.handleOpenModal}>
                                <AddIcon />
                            </Fab>
                            <div className='events'>
                                {this.state.events.map(data =>
                                    <EventCard key={data.eventId} data={data} onDelete={this.updateAfterDelete}/>
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
                                    // onClick={this.props.history.push('/home')}
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
                        conferenceName={this.state.conferenceName}
                        onEdit={this.editEvent}
                        editEvent={editEvent}
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