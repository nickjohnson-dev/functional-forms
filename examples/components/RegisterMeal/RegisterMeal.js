import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { Form, TextField } from '../../../src/index';
import { validateAsync } from '../../helpers';

const Input = fieldProps => h(TextField, {
  ...fieldProps,
  className: 'input',
  errorClassName: 'input--error',
  errorMessageClassName: 'error',
  successClassName: 'input--success',
  successMessageClassName: 'success',
});

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
          component: Input,
          label: 'Food',
          getMessages: this.getFoodMessages,
          value: '',
        },
        name: {
          component: Input,
          label: 'Name',
          getMessages: (name) => {
            if (!(name.isDirty && name.isTouched)) return undefined;

            if (!name.value) {
              return [{ type: 'error', message: 'Please specify a name' }];
            }

            return undefined;
          },
          value: '',
        },
        address: {
          label: 'Address',
          fields: {
            street: {
              component: Input,
              label: 'Street',
              value: '',
            },
            zip: {
              component: Input,
              label: 'ZIP Code',
              value: '',
            },
          },
        },
      },
    };
  }

  getFoodMessages = (food) => {
    if (!(food.isDirty && food.isTouched)) return undefined;

    if (!food.value) {
      return [{ type: 'error', message: 'Please specify a food' }];
    }

    return validateAsync(500, food.value).then(x => [x]);
  };

  handleFieldsChange = (fields) => {
    this.setState({
      fields,
    });
  }

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
