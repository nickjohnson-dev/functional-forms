import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { Form, TextField } from '../../../src/index';
import { validateAsync } from '../../helpers';

export class RegisterMeal extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    style: StylePropType,
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: {
        food: {
          component: TextField,
          getErrors: this.getFoodErrors,
          value: '',
        },
      },
    };
  }

  getFoodErrors = (food) => {
    // if (!food.isTouched) return [];

    if (!food.value) {
      return ['Please specify a food'];
    }

    return validateAsync(1000, food.value)
      .then(x => (x ? [x] : []));
  };

  handleFieldsChange = fields =>
    this.setState({
      fields,
    });

  render() {
    return h(Form, {
      className: 'RegisterMeal',
      fields: this.state.fields,
      onFieldTouch: this.handleFieldTouch,
      onFieldsChange: this.handleFieldsChange,
      style: this.props.style,
    });
  }
}
