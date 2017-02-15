import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { getTextField } from '../text-field/text-field';

export class Form extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    fields: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ),
    onFieldsChange: React.PropTypes.func,
    style: StylePropType,
  };

  static defaultProps = {
    field: {},
  };

  render() {
    return h(this.getComponent(), {
      className: this.props.className,
      field: this.props.field,
      onFieldChange: this.props.onFieldChange,
      style: this.props.style,
    });
  }

  handleFieldChange = field => this.props.onFieldChange(field);
}
