import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { Form } from '../../../src/index';

export class App extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    style: StylePropType,
  };

  state = {
    fields: getInitialFields(),
  };

  render() {
    return h('.app', {
      className: this.props.className,
      style: this.props.style,
    }, [
      h(Form, {
        fields: this.state.fields,
        onFieldsChange: this.handleFormFieldsChange,
      }),
    ]);
  }

  handleFormFieldsChange = fields =>
    this.setState({ fields: log(fields, 'Fields Change') });
}

class CustomComp extends React.PureComponent {
  render() {
    return h('div', [
      `A Custom Class Component! ${this.props.value}`,
      h('button', {
        onClick: () => this.props.onChange('A'),
      }, ['Set A']),
      h('button', {
        onClick: () => this.props.onChange('B'),
      }, ['Set B']),
    ]);
  }
}

function getInitialFields() {
  return [
    {
      id: 'custom',
      component: props => h('div', {
        onClick: () => props.onChange(!props.value),
      }, [
        `Custom Component Value: ${props.value}`,
      ]),
      value: false,
    },
    {
      id: 'custom2',
      component: CustomComp,
      value: 'WITH A CRAZY VALUE!',
    },
    {
      id: 'Favorite Food',
      getErrors: (value) => {
        console.log('checking val', value);
        return value === 'Tacos' ? [] : [
          'Should be "Tacos"',
          'THIS IS IMPORTANT',
        ];
      },
      component: 'text',
      onBlur: e => console.log('blurred!', e),
      onClick: e => console.log('clicked!', e),
      onMouseUp: e => console.log('mouse UPP!', e),
      value: 'Some Text',
    },
  ];
}

function log(value, label) {
  if (label) {
    // eslint-disable-next-line no-console
    console.log(label, value);
  } else {
    // eslint-disable-next-line no-console
    console.log(value);
  }
  return value;
}
