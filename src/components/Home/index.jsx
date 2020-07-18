import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../Home/home.sass'


class Home extends Component {

    constructor(props) {
        super(props);
    
        this.state = {}
    }

    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}

export default withRouter(Home)