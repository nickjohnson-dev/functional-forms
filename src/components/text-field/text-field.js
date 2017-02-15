import React from 'react';
import h from 'react-hyperscript';

export class TextField extends React.Component {
  static propTypes = {
    errors: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ),
    isTouched: React.PropTypes.bool,
    label: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
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
        onBlur: this.props.onBlur,
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

  handleInputChange = e =>
    this.props.onChange(e.target.value);
}
