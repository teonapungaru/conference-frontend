import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import SuccesIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import green from '@material-ui/core/colors/green';

const style = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export const SNACKBAR_TYPE = {
  success: "success",
  error: "error"
};


const MySnackbarContent = ({ classes, className, message, onClose, variant, ...other }) => (
  <SnackbarContent
    className={classNames(classes[variant], className)}
    aria-describedby="client-snackbar"
    message={
      <span id="client-snackbar" className={classes.message}>
        {variant === 'error' ?
          <ErrorIcon className={classNames(classes.icon, classes.iconVariant)} />
          :
          <SuccesIcon className={classNames(classes.icon, classes.iconVariant)} />
        }
        {message}
      </span>
    }
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
    {...other}
  />
);


MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};

const MySnackbarContentWrapper = withStyles(style)(MySnackbarContent);

class CustomizedSnackbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      return { someState: nextProps.open };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({ open: this.props.open });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
    this.props.handleClose();
    if (this.props.redirect) {
      this.props.path.push(this.props.redirect);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant={this.props.variant}
            className={classes.margin}
            message={this.props.message}
          />
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Snackbars = withStyles(style)(CustomizedSnackbar);