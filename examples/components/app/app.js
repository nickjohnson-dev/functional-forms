import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { RegisterMeal } from '../RegisterMeal/RegisterMeal';
import './App.css';

export class App extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    style: StylePropType,
  };

  render() {
    return h('.App', {
      className: this.props.className,
      style: this.props.style,
    }, [
      h('.App__content', [
        h(RegisterMeal),
      ]),
    ]);
  }
}
