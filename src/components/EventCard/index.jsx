import React from 'react';
import Truncate from 'react-truncate';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ScheduleIcon from '@material-ui/icons/Schedule';
// import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import toDate from 'date-fns/toDate'
import lightFormat from 'date-fns/lightFormat'
import ModalWrapped from '../Modal'
import IconButton from '@material-ui/core/IconButton';
import makeRequest from '../../service/dataservice';

const styles = theme => ({
    // root: {
    //     width: '100%',
    //     marginTop: theme.spacing.unit * 2,
    //     overflowX: 'auto',
    // },
    // header: {
    //     minWidth: 300,
    // },
    // title: {
    //     margin: theme.spacing.unit / 2,
    // },
    // text: {
    //     width: '80px',
    //     paddingRight: '20px'
    // }
    root: {
        width: 500,
        // height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        // alignSelf: 'center'
        //paddingTop: '20px'

    },
    header: {
        display: 'flex',
        width: '640px',
        height: '18px',
        fontSize: '15px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: '#000000',
        textAlign: 'left',
        marginTop: '30px',
        justifyContent: 'space-between'
    },
    title: {
        width: '608px',
        height: '65px',
        fontSize: '18px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.44,
        letterSpacing: 'normal',
        color: '#767676',
        textAlign: 'left',
        paddingTop: '15px'
    },
    text: {
        width: '608',
        // height: '54px',
        fontSize: '18px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.44,
        letterSpacing: 'normal',
        color: '#767676',
        textAlign: 'left'
    },
    address: {
        display: 'flex',
        width: '209px',
        height: '72px'
    },
    addressText: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: '#767676',
        display: 'flex',
        alignSelf: 'baseline',
        margin: '0 0 0 7px'
    },
    time: {
        width: '209px',
        height: '18px',
        display: 'flex',
    },
    timePlan: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: '#767676',
        //marginBottom: '20px',
        alignSelf: 'baseline',
        margin: '0 0 0 7px',
    },
    eventTimes: {
        display: 'flex',
        flexDirection: 'column'
    },
    div: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px'
    },
    people: {
        height: '18px',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px'
    },
    participants: {
        fontSize: '12px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: '#767676',
        margin: '0 0 0 7px'
    },
    // eventFull: {
    //     fontSize: '12px',
    //     fontWeight: 'normal',
    //     fontStretch: 'normal',
    //     fontStyle: 'normal',
    //     lineHeight: 1.5,
    //     letterSpacing: 'normal',
    //     color: 'red',
    //     margin: '0 0 0 7px'
    // },
    // icon: {
    //     paddingBottom: '105px'
    // },
    line: {
        width: '608px',
        height: '1px',
        backgroundColor: '#d8d8d8',
        marginTop: '40px'
    },
    less: {
        color: '#767676',
        paddingTop: '55px'
    },
    edit: {
        display: 'flex',
        alignSelf: 'flex-end',
        // flexDirection: 'column',
        width: '80px',
        /* padding-top: 50px; */
        height: '80px',
        justifyContent: 'space-between',
        marginBottom: '-70px'
    },
    margin: {
        height: '45px'
    },
});

class EventCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            truncated: false,
            expanded: false
        }

        this.handleTruncate = this.handleTruncate.bind(this);
        this.toggleLines = this.toggleLines.bind(this);
    }

    handleTruncate = (truncated) => {
        if (this.state.truncated !== truncated) {
            this.setState({ truncated })
        }
    }

    toggleLines = (event) => {
        event.preventDefault();
        this.setState({ expanded: !this.state.expanded })
    }

    handleOpenModal = () => {
        this.setState({ openModal: true })
    }

    handleModalClose = () => {
        this.setState({ openModal: false })
    }

    edit = () => {
        this.handleOpenModal();
    }

    delete = async (eventId) => {
        try {
            const response = await makeRequest('deleteEvent', {
                data: {
                    eventId
                }
            });
            // this.props.snackBar(response, 'success');
            this.props.onDelete(eventId)
        } catch (e) {
            // this.props.snackBar(e, 'error');
            console.log(e);
        }
    }

    render() {
        const {
            expanded,
            truncated
        } = this.state;

        const { program, location, description, title } = this.props.data;
        const start = program[0] && lightFormat(toDate(program[0] * 1000), 'dd.mm.yyyy');
        const end = program[1] && lightFormat(toDate(program[1] * 1000), 'dd.mm.yyyy');

        console.log(this.props.conferenceName, 'event carddd')

        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.header}>
                    {end ? `${start} - ${end}` : `${start}`}
                    <div className={this.props.classes.edit}>
                        <IconButton aria-label="Edit" className={this.props.classes.margin} onClick={() => this.edit()}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="Edit" className={this.props.classes.margin} onClick={() => this.delete(this.props.data.eventId)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
                <div className={this.props.classes.title}>
                    {title}
                </div>
                <div className={this.props.classes.text}>
                    <Truncate
                        lines={!expanded && 3}
                        ellipsis={(
                            <div> <ExpandMoreTwoToneIcon fontSize='large' onClick={this.toggleLines} /> <u><a href='#' onClick={this.toggleLines}></a></u></div>
                        )}
                        onTruncate={this.handleTruncate}
                    >
                        {description}
                    </Truncate>
                    {!truncated && expanded && (
                        <div> <ExpandLessTwoToneIcon fontSize='large' onClick={this.toggleLines} /> <u><a href='#' onClick={this.toggleLines}></a></u></div>
                    )}
                </div>

                <div className={this.props.classes.div}>

                    <div className={this.props.classes.address}>
                        <LocationOnIcon className={this.props.classes.icon} />
                        <div>
                            {location}
                        </div>
                    </div>

                </div>
                <div className={this.props.classes.line}></div>
                {this.state.openModal && <ModalWrapped
                    user={false}
                    onClose={this.handleModalClose}
                    open={this.state.openModal}
                    conferenceName={this.props.conferenceName}
                    editEvent={this.props.data}
                    eventToEdit={this.props.eventToEdit}
                />}
            </div>
        )
    }
}

export default withStyles(styles)(EventCard)