import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';

import './card.sass'

const styles = {
  card: {
      maxWidth: 600,
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
    sessionStorage.setItem('clickedCard', true);
    this.props.history.push('/home');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <Card className={classes.card}>
          <CardActionArea onClick={this.clickedCard}>
            <div className="card">
              <div className="card-img">
              <img className='card-image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_J9Zwnx1awpQAmUDV3iSKtBETKRujdYMnhvEm8xIRbf3DKnkD&s'/>
              </div>
              <div className="card-content">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Conferinta 1
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Detalii conferinta etc
                  </Typography>
                </CardContent>
              </div>
            </div>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ImgMediaCard));