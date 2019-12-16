import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ImgMediaCard from '../Card'

class WelcomePage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {}
    }

    render() {
        return (
            <ImgMediaCard />    
        )
    }
}

export default withRouter(WelcomePage)