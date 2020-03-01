import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Header from '../Header'
import '../Home/home.sass'


class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {}
    }

    render() {
        return (
            <div className="home-window">
                <Header />
            </div>
            
        )
    }
}

export default withRouter(Home)