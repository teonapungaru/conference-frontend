import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import ConferenceLogo from '../../assets/Logo-ICSTCC-2020-main.svg'

import './card.sass'

const styles = {
  card: {
      width: 400,
      margin: 20,
      borderRadius: 15
  }
};

class ImgMediaCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  clickedCard = () => {
    localStorage.setItem('conferenceTitle', this.props.data.title)
    this.props.history.push('/addConf');
  }

  render() {
    const { classes } = this.props;

    return (
      //<div className="card-container">
        <Card className={classes.card}>
          <CardActionArea onClick={this.clickedCard}>
            <div className="card">
              <div className="card-img">
              {this.props.data.img ? <img alt="Conference Logo" className='card-image' src={this.props.data.img} /> : <img alt="Conference Logo" className='card-image' src={ConferenceLogo} />}
              </div>
              <div className="card-content">
                <CardContent>
                  {this.props.data.title && <Typography gutterBottom variant="h5" component="h2">
                    {this.props.data.title}
                  </Typography>}
                  {this.props.data.details && <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.data.details}
                  </Typography>}
                </CardContent>
              </div>
            </div>
          </CardActionArea>
        </Card>
     // </div>
    );
  }
}

export default withRouter(withStyles(styles)(ImgMediaCard));