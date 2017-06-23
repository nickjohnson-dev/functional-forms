import React from 'react';
import h from 'react-hyperscript';
import { Form, TextField } from '../../../src/index';
import { validateAsync } from '../../helpers';
import './RegisterMeal.css';

const Input = props => h(TextField, {
  ...props,
  className: `RegisterMeal__field RegisterMeal__field--${props.field.key}`,
  errorClassName: 'RegisterMeal__field--error',
  messageClassName: 'RegisterMeal__field__message',
  messageErrorClassName: 'RegisterMeal__field__message--error',
  messageSuccessClassName: 'RegisterMeal__field__message--success',
  successClassName: 'RegisterMeal__field--success',
});

const SubForm = props => h('.RegisterMeal__sub-form', {}, [
  h('.RegisterMeal__sub-form__label', [
    props.field.label,
  ]),
  h('.RegisterMeal__sub-form__content', props.children),
]);

export class RegisterMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: {
          component: Input,
          label: 'Name',
          getMessages: this.getNameMessages,
          value: 'bob',
        },
        food: {
          component: Input,
          label: 'Food',
          getMessages: this.getFoodMessages,
          value: '',
        },
        address: {
          component: SubForm,
          label: 'Delivery Address',
          fields: {
            street: {
              component: Input,
              label: 'Street',
              messages: [{ type: 'error', message: 'blah' }],
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

  getNameMessages = (name) => {
    if (!(name.isDirty && name.isTouched)) return undefined;

    if (!name.value) {
      return [{ type: 'error', message: 'Please specify a name' }];
    }

    return undefined;
  }

  handleFieldsChange = fields => this.setState({ fields });

  render() {
    return h(Form, {
      className: 'RegisterMeal',
      fields: this.state.fields,
      onFieldsChange: this.handleFieldsChange,
    });
  }
}
