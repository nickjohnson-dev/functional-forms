import _ from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import { TextField } from '../text-field/text-field';

export class Field extends React.Component {
  static propTypes = {
    field: React.PropTypes.object,
    onFieldChange: React.PropTypes.func,
  };

  static defaultProps = {
    field: {},
  };

  render() {
    return h(this.getComponent(), {
      errors: this.getErrors(),
      isTouched: this.props.field.isTouched || false,
      label: this.getLabel(),
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onIsTouchedChange: this.handleIsTouchedChange,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      onKeyUp: this.handleKeyUp,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      value: this.props.field.value,
    });
  }

  getComponentByType = type => ({
    text: TextField,
  })[type];

  getComponent = () => {
    if (_.isNil(this.props.field.id)) {
      throw new Error('Fields must have an id property');
    }

    if (_.isString(this.props.field.component)) {
      return this.getComponentByType(this.props.field.component);
    }

    if (_.isFunction(this.props.field.component)) {
      return this.props.field.component;
    }

    throw new Error('Field component must be a valid type string or a React component.');
  };

  getErrors = () => {
    if (this.props.field.isValid) {
      return [];
    }

    if (_.isFunction(this.props.field.getErrors)) {
      return this.props.field.getErrors(this.props.field.value);
    }

    return [];
  }

  getLabel = () =>
    this.props.field.label || this.props.field.id;

  handleBlur = (e) => {
    if (!_.isFunction(this.props.field.onBlur)) return;
    this.props.field.onBlur(e);
  }

  handleChange = value =>
    this.props.onFieldChange({
      ...this.props.field,
      value,
    });

  handleClick = (e) => {
    if (!_.isFunction(this.props.field.onClick)) return;
    this.props.field.onClick(e);
  };

  handleFocus = (e) => {
    if (!_.isFunction(this.props.field.onFocus)) return;
    this.props.field.onFocus(e);
  };

  handleIsTouchedChange = isTouched =>
    this.props.onFieldChange({
      ...this.props.field,
      isTouched,
    });

  handleKeyDown = (e) => {
    if (!_.isFunction(this.props.field.onKeyDown)) return;
    this.props.field.onKeyDown(e);
  };

  handleKeyPress = (e) => {
    if (!_.isFunction(this.props.field.onKeyPress)) return;
    this.props.field.onKeyPress(e);
  };

  handleKeyUp = (e) => {
    if (!_.isFunction(this.props.field.onKeyUp)) return;
    this.props.field.onKeyUp(e);
  };

  handleMouseDown = (e) => {
    if (!_.isFunction(this.props.field.onMouseDown)) return;
    this.props.field.onMouseDown(e);
  };

  handleMouseUp = (e) => {
    if (!_.isFunction(this.props.field.onMouseUp)) return;
    this.props.field.onMouseUp(e);
  };
}
