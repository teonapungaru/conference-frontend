import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

export default function (WrappedComponent) {
  class Clicked extends Component {

    componentWillMount() {
      if (!sessionStorage.getItem('clickedCard')) {
        this.props.history.push('/welcome');
      }
    }

    render() {
      return <WrappedComponent/>
    }
  }

  return withRouter(Clicked);
}