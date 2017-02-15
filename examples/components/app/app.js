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
    fields: getFields(),
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
    this.setState({ fields });
}

function getFields() {
  return [
    {},
  ];
}
