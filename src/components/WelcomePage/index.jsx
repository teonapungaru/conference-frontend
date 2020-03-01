import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ImgMediaCard from '../Card'
import ButtonAppBar from '../ButtonAppBar/index';

class WelcomePage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {}
    }

    render() {
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <ImgMediaCard />  
            </div> 
        )
    }
}

export default withRouter(WelcomePage)