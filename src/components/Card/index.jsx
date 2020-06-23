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
    //sessionStorage.setItem('clickedCard', true);
    this.props.history.push('/addConf');
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.data)

    return (
      //<div className="card-container">
        <Card className={classes.card}>
          <CardActionArea onClick={this.clickedCard}>
            <div className="card">
              <div className="card-img">
              {this.props.data.img && <img className='card-image' src={this.props.data.img} />}
              </div>
              <div className="card-content">
                <CardContent>
                  {this.props.data.name && <Typography gutterBottom variant="h5" component="h2">
                    {this.props.data.name}
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