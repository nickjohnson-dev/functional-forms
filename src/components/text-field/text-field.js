import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import React from 'react';
import h from 'react-hyperscript';

export class TextField extends React.Component {
  static propTypes = {
    errors: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
    isDirty: React.PropTypes.bool,
    isTouched: React.PropTypes.bool,
    label: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onIsDirtyChange: React.PropTypes.func,
    onIsTouchedChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    value: React.PropTypes.any,
  };

  render() {
    return h('.ff-text-field', {
      style: {
        display: 'flex',
        flexDirection: 'column',
      },
    }, [
      h('label.ff-text-field__label', [
        this.props.label,
      ]),
      h('input.ff-text-field__input', {
        onBlur: this.handleBlur,
        onChange: this.handleInputChange,
        onClick: this.props.onClick,
        onFocus: this.props.onFocus,
        onKeyDown: this.props.onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onKeyUp: this.props.onKeyUp,
        onMouseDown: this.props.onMouseDown,
        onMouseUp: this.props.onMouseUp,
        type: 'text',
        value: this.props.value,
      }),
      this.props.errors.map(error => h('.ff-text-field__error', {
        key: error,
      }, [
        error,
      ])),
    ]);
  }

  handleBlur = (e) => {
    const isTouched = getOr(false, 'props.isTouched', this);
    const onBlur = getOr(noop, 'props.onBlur', this);
    const onIsTouchedChange = getOr(noop, 'props.onIsTouchedChange', this);

    if (!isTouched) {
      onIsTouchedChange(true);
    }

    onBlur(e);
  }

  handleInputChange = (e) => {
    const isDirty = getOr(false, 'props.isDirty', this);
    const onChange = getOr(noop, 'props.onChange', this);
    const onIsDirtyChange = getOr(noop, 'props.onIsDirtyChange', this);
    const value = getOr('', 'target.value', e);

    onChange(value);

    if (!isDirty) {
      onIsDirtyChange(true);
    }
  }
}
