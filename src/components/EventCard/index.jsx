import React from 'react';
import Truncate from 'react-truncate';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import ExpandLessTwoToneIcon from '@material-ui/icons/ExpandLessTwoTone';
import ScheduleIcon from '@material-ui/icons/Schedule';
// import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

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
        width: '608px',
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
        margin: 0,
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
    icon: {
        paddingBottom: '55px'
    },
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
        alignSelf: 'flex-end'
    }
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

    handleTruncate(truncated) {
        if (this.state.truncated !== truncated) {
            this.setState({ truncated })
        }
    }

    toggleLines(event) {
        event.preventDefault();
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const {
            expanded,
            truncated
        } = this.state;

        const { eventDays, address, text, times, totalParticipants, participants } = this.props.data;

        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.header}>
                    {eventDays.length > 1 ? `${eventDays[0]} - ${eventDays[1]}` : `${eventDays[0]}`}
                    <div className={this.props.classes.edit} ><EditIcon /></div>
                </div>
                <div className={this.props.classes.title}>
                    Titlu fumos la eveniment/sesiune/cum pnm ii zice
                </div>
                <div className={this.props.classes.text}>
                    <Truncate
                        lines={!expanded && 3}
                        ellipsis={(
                            <div> <u><a href='#' onClick={this.toggleLines}><ExpandMoreTwoToneIcon fontSize='large' /></a></u></div>
                        )}
                        onTruncate={this.handleTruncate}
                    >
                        {text}
                    </Truncate>
                    {!truncated && expanded && (
                        <div> <u><a href='#' onClick={this.toggleLines}><ExpandLessTwoToneIcon fontSize='large' /></a></u></div>
                    )}
                </div>

                <div className={this.props.classes.div}>

                    <div className={this.props.classes.address}>
                        <LocationOnIcon className={this.props.classes.icon} />
                        <div>
                            {address.text.map((item, key) =>
                                <div className={this.props.classes.addressText} key={key}>{item}</div>
                            )}
                        </div>
                    </div>

                    <div className={this.props.classes.time}>
                        <ScheduleIcon />
                        <div>
                            {times.map((item, key) =>
                                // <div className={this.props.classes.timePlan}>
                                <div className={this.props.classes.eventTimes} key={key}>
                                    {/* <div className={this.props.classes.timePlan} >{item.event}</div> */}
                                    <div className={this.props.classes.timePlan} >{`${item.hours[0]} - ${item.hours[1]}`}</div>
                                </div>
                                // </div>
                            )}
                        </div>
                    </div>

                </div>
                {/* <div className={this.props.classes.people}>
                    <PeopleOutlineIcon />
                    {totalParticipants > participants ? <div className={this.props.classes.participants}>{`${participants} von ${totalParticipants} möglichen Teilnehmern bisher`}</div> : <div className={this.props.classes.eventFull}>Die Veranstaltung ist leider ausgebucht</div>}
                </div> */}
                <div className={this.props.classes.line}></div>
            </div>
        )
    }
}

export default withStyles(styles)(EventCard)