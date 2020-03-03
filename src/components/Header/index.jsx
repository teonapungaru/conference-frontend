import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Home from '../Home'
//import Program from '../Program'
import Authors from '../Authors'



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
                <div className="home-window">
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
                </div>

                <Route exact path={`${this.props.match.path}home`} component={Home} />
                {/*<Route exact path={`${this.props.match.path}program`} component={Program} />
                <Route exact path={`${this.props.match.path}committees`} component={Committees} />
                <Route exact path={`${this.props.match.path}speakers`} component={Speakers} /> 
                */}
                <Route exact path={`${this.props.match.path}authors`} component={Authors} />
                {/*<Route exact path={`${this.props.match.path}registration`} component={Registration} />
                <Route exact path={`${this.props.match.path}papers`} component={Papers} />
                <Route exact path={`${this.props.match.path}accommodation`} component={Accommodation} />
                */}
            </MuiThemeProvider>
        )
    }
}

export default withRouter(Header);