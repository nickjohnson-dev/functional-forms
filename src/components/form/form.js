import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';

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
    fields: [],
  };

  render() {
    return h('.ff-form', {
      className: this.props.className,
      style: this.props.style,
    }, [
      this.props.fields.length,
    ]);
  }
}
