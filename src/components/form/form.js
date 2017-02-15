import { isFunction, isNil, isString } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { replaceById } from '../../helpers';
import { TextField } from '../text-field/text-field';

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
      this.props.fields.map(field => h(this.getComponent(field), {
        key: field.id,
        onFieldChange: this.handleFieldChange,
        field,
      })),
    ]);
  }

  getComponentByType = type => ({
    text: TextField,
  })[type];

  getComponent = (field) => {
    if (isNil(field.id)) {
      throw new Error('Fields must have an id property');
    }

    if (isString(field.component)) {
      return this.getComponentByType(field.component);
    }

    if (isFunction(field.component)) {
      return field.component;
    }

    throw new Error('Field component must be a valid type string or a React component.');
  };

  handleFieldChange = field =>
    this.props.onFieldsChange(replaceById(field)(this.props.fields));
}
