import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 2,
        overflowX: 'auto',
    },
    header: {
        minWidth: 300,
    },
    title: {
        margin: theme.spacing.unit / 2,
    },
    text: {
        width: '80px',
        paddingRight: '20px'
    }
});

class EventCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <div className={this.props.classes.header}>
                    dfbnm
                    <div className={this.props.classes.title}>dfgbhnj
                        <div className={this.props.classes.text}>
                            fdcgvhbjkjhgfdgh
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(EventCard)