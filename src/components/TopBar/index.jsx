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

    render() {
        const { anchorEl } = this.state;

        return (
            <div className="buttons">
                <Button onClick={this.goToHome}>Home</Button>
                <Button onClick={this.goToProgram}>Program</Button>
                <Button onClick={this.goToCommittees}>Committees</Button>

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