import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddUser from '../AddUser'
import AddEvent from '../AddEvent';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 80,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {this.props.user ? <AddUser closeModal={this.handleClose} conferenceId={this.props.conferenceId} editUser={this.props.editUser} onEdit={this.props.onEdit}/> : <AddEvent closeModal={this.handleClose} conferenceName={this.props.conferenceName} eventToEdit={this.props.eventToEdit} editEvent={this.props.editEvent}/>}
            {/* <SimpleModalWrapped /> */}
          </div>
        </Modal>
      </div>
    );
  }
}

ModalComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ModalWrapped = withStyles(styles)(ModalComponent);

export default ModalWrapped;