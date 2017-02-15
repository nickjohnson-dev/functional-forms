import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';

export class TextField extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    field: React.PropTypes.object,
    onFieldChange: React.PropTypes.func,
    style: StylePropType,
  };

  static defaultProps = {
    field: {},
  };

  render() {
    return h('input.ff-text-input', {
      className: this.props.className,
      onChange: this.handleChange,
      style: this.props.style,
      type: 'text',
      value: this.props.field.value,
    });
  }

  handleChange = e =>
    this.props.onFieldChange({
      ...this.props.field,
      value: e.target.value,
    });
}
