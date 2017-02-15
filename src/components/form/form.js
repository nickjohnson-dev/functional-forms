import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { replaceById } from '../../helpers';
import { Field } from '../field/field';

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
      this.props.fields.map(field => h(Field, {
        key: field.id,
        onFieldChange: this.handleFieldChange,
        field,
      })),
    ]);
  }

  handleFieldChange = field =>
    this.props.onFieldsChange(replaceById(field)(this.props.fields));
}
