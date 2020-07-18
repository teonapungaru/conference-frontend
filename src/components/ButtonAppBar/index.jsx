import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';



const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    background: 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,100,121,1) 35%, rgba(2,0,36,1) 100%)',
  },
  button: {
    width: '15%',
  }
});

class ButtonAppBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  logout = () => {
    window.localStorage.clear();
    this.props.history.push('/login')
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.grow}>
          <Button color="inherit" className={classes.button} onClick={()=>{this.logout()}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ButtonAppBar));