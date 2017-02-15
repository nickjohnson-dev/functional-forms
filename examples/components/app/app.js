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

function getInitialFields() {
  return [
    {
      id: 'custom',
      component: () => h('div', [
        'This component is being rendered as a field',
      ]),
    },
    {
      id: 'sample text',
      component: 'text',
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
