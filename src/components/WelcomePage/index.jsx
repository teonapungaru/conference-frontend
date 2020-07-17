import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ImgMediaCard from '../Card'
import ButtonAppBar from '../ButtonAppBar/index';
import './WelcomePage.sass'
import AddSvg from '../../assets/icons8-plus-2.svg'

import makeRequest from '../../service/dataservice'

const addData = {
    title: 'Add new conference',
    img: AddSvg
}

class WelcomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            renderPage: false
        }
    }

    getRoles = async () => {
        const response = await makeRequest('userRoles');
        response.roles.find(item => item === 'ADMINISTRATOR')
            ? this.setState({ roles: response.roles, isAdmin: true })
            : this.setState({ roles: response.roles });
    }

    getConferences = async () => {
        const response =  await makeRequest('getConferences');
        this.setState({ conferences: response.conferences })
    }

    loadContent = async () => {
        try {
            await Promise.all([
                this.getRoles(),
                this.getConferences()
            ]);
            this.setState({ renderPage: true });
        } catch (err) {
            this.setState({ message: err, openSnackbar: true });
        };
    }

    componentDidMount() {
        this.loadContent();
    }


    render() {
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                {this.state.renderPage && <div className="card-container">
                    {this.state.isAdmin && <ImgMediaCard data={addData} key={addData.title} />}
                    {this.state.conferences.map(item =>
                        <ImgMediaCard data={item} key={item.name} />
                    )}
                </div>}
            </div>
        )
    }
}

export default withRouter(WelcomePage)