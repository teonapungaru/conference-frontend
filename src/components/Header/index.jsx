import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';


import TopBar from '../TopBar/index.jsx';
import './header.sass';

const colorScheme = createMuiTheme({
    palette: {
        primary: { main: '#fff' },
        secondary: {
            light: '#e3e000',
            main: '#f6f6f7',
            dark: '#0f738a'
        }
    },
    typography: {
        useNextVariants: true
    },
});

class Header extends Component {

    render() {
        return (
            <MuiThemeProvider theme={colorScheme}>
                <div className="home">
                    <div className="conf-img">
                        <img className="home-img" src="http://www.icstcc2017.ac.tuiasi.ro/wp-content/uploads/sites/16/2016/11/ICSTCC_logo2.jpg" />
                    </div>
                    <div className="title">
                        21st International Conference on System Theory, Control and Computing
                    </div>
                    <div style={{width: '100%'}}>
                    <AppBar position="static">
                        <Toolbar className="toolbar">
                            <TopBar />
                        </Toolbar>
                    </AppBar>
                    </div>
                </div>
                
               {/* { <Route exact path={`${this.props.match.path}`} component={Home} />
                <Route exact path={`${this.props.match.path}cars`} component={Program} />
                <Route exact path={`${this.props.match.path}customers`} component={Committees} />} */}
            </MuiThemeProvider>
        )
    }
}

export default withRouter(Header);