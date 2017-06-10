import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import React from 'react';
import h from 'react-hyperscript';

export class TextField extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    errorClassName: React.PropTypes.string,
    field: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onIsTouchedChange: React.PropTypes.func,
    successClassName: React.PropTypes.string,
  };

  getClassName = (status) => {
    const errorClassName = getOr('', 'props.errorClassName', this);
    const successClassName = getOr('', 'props.successClassName', this);

    if (status.type === 'error') {
      return errorClassName;
    }

    if (status.type === 'success') {
      return successClassName;
    }

    return '';
  }

  getLabel = () =>
    getOr('', 'props.field.label', this);

  getStatuses = () =>
    getOr([], 'props.field.statuses', this);

  getValue = () =>
    getOr('', 'props.field.value', this);

  handleInputBlur = (e) => {
    const isTouched = getOr(false, 'props.isTouched', this);
    const onBlur = getOr(noop, 'props.onBlur', this);
    const onIsTouchedChange = getOr(noop, 'props.onIsTouchedChange', this);

    if (!isTouched) {
      onIsTouchedChange(true);
    }

    onBlur(e);
  }

  handleInputChange = (e) => {
    const onChange = getOr(noop, 'props.onChange', this);
    const fieldOnChange = getOr(noop, 'props.field.onChange', this);
    const value = getOr('', 'target.value', e);

    onChange(value);
    fieldOnChange(e);
  }

  handleInputClick = (e) => {
    const onClick = getOr(noop, 'props.field.onClick', this);
    const field = getOr({}, 'props.field', e);

    onClick(e, field);
  }

  handleInputFocus = (e) => {
    const onFocus = getOr(noop, 'props.field.onFocus', this);
    const field = getOr({}, 'props.field', e);

    onFocus(e, field);
  }

  handleInputKeyDown = (e) => {
    const onKeyDown = getOr(noop, 'props.field.onKeyDown', this);
    const field = getOr({}, 'props.field', e);

    onKeyDown(e, field);
  }

  handleInputKeyPress = (e) => {
    const onKeyPress = getOr(noop, 'props.field.onKeyPress', this);
    const field = getOr({}, 'props.field', e);

    onKeyPress(e, field);
  }

  handleInputKeyUp = (e) => {
    const onKeyUp = getOr(noop, 'props.field.onKeyUp', this);
    const field = getOr({}, 'props.field', e);

    onKeyUp(e, field);
  }

  handleInputMouseDown = (e) => {
    const onMouseDown = getOr(noop, 'props.field.onMouseDown', this);
    const field = getOr({}, 'props.field', e);

    onMouseDown(e, field);
  }

  handleInputMouseUp = (e) => {
    const onMouseUp = getOr(noop, 'props.field.onMouseUp', this);
    const field = getOr({}, 'props.field', e);

    onMouseUp(e, field);
  }

  render() {
    return h('div', {
      className: this.props.className,
    }, [
      h('label', [
        this.getLabel(),
      ]),
      h('input', {
        onBlur: this.handleInputBlur,
        onChange: this.handleInputChange,
        onClick: this.handleInputClick,
        onFocus: this.handleInputFocus,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        onKeyUp: this.handleKeyUp,
        onMouseDown: this.handleMouseDown,
        onMouseUp: this.handleMouseUp,
        type: 'text',
        value: this.getValue(),
      }),
      this.getStatuses().map((status, index) => h('div', {
        className: this.getClassName(status),
        key: index,
      }, [
        status.message,
      ])),
    ]);
  }
}
