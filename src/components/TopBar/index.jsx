import React from 'react';
import { withRouter } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import { navigation } from '../config/path.js'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';

import './topBar.sass';

class TopBar extends React.Component {

    constructor() {
        super()

        this.state = { anchorEl: null }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, open: false });
    };

    goToHome = () => {
        this.handleClose();
        this.props.history.push(navigation.home);

    }

    goToProgram = () => {
        this.handleClose();
        this.props.history.push(navigation.program);

    }

    goToCommittees = () => {
        this.handleClose();
        this.props.history.push(navigation.committees);
    }
    
    goToSpeakers = () => {
        this.handleClose();
        this.props.history.push(navigation.speakers);
    }

    goToAuthors = () => {
        this.handleClose();
        this.props.history.push(navigation.authors);
    }

    goToRegistration = () => {
        this.handleClose();
        this.props.history.push(navigation.registration);
    }

    goToPapers = () => {
        this.handleClose();
        this.props.history.push(navigation.papers);
    }

    goToAccommodation = () => {
        this.handleClose();
        this.props.history.push(navigation.accommodation);
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div className="buttons">
                <Button onClick={this.goToHome} className="button">Home</Button>
                <Button onClick={this.goToProgram} className="button">Program</Button>
                <Button onClick={this.goToCommittees} className="button">Committees</Button>
                <Button onClick={this.goToSpeakers} className="button">Plenary Speakers</Button>
                <Button onClick={this.goToAuthors} className="button">Authors</Button>
                <Button onClick={this.goToRegistration} className="button">Registration</Button>
                <Button onClick={this.goToPapers} className="button">Call For Papers</Button>
                <Button onClick={this.goToAccommodation} className="button">Accommodation and Travel</Button>

                <ClickAwayListener onClickAway={this.handleClose}>
                    <Menu
                        id="top-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                    </Menu>
                </ClickAwayListener>
            </div>
        );
    }
}

export default withRouter(TopBar);