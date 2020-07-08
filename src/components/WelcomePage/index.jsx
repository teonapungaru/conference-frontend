import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ImgMediaCard from '../Card'
import ButtonAppBar from '../ButtonAppBar/index';
import './WelcomePage.sass'

const mockData = [
    {
        name: 'Add new conference',
        img: 'https://cdn.nohat.cc/thumb/f/720/comvecteezy450402.jpg'
    },
    {
        name: 'Conferinta 1',
        details: 'Detalii conferinta 1',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_J9Zwnx1awpQAmUDV3iSKtBETKRujdYMnhvEm8xIRbf3DKnkD&s'
    }
   
]

class WelcomePage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {}
    }


    render() {
        console.log(mockData);
        return (
            <div>
                <div>
                    <ButtonAppBar />
                </div>
                <div className="card-container">
                {mockData.map(item => 
                   // console.log(item, 'item') 
                
                <ImgMediaCard data={item} key={item.name}/> 
                )} 
                </div>
            </div> 
        )
    }
}

export default withRouter(WelcomePage)