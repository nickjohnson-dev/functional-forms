import debounce from 'lodash/fp/debounce';
import _ from 'lodash/fp';
import getOr from 'lodash/fp/getOr';
import isArray from 'lodash/fp/isArray';
import noop from 'lodash/fp/noop';
import React from 'react';
import h from 'react-hyperscript';

const makeCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val =>
      (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
    );
    promise.catch(error =>
      (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};

export class Field extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    field: React.PropTypes.object.isRequired,
    onFieldChange: React.PropTypes.func.isRequired,
  };

  getErrorsPromise;

  state = {
    errors: [],
  };

  componentWillReceiveProps(nextProps) {
    this.getErrors(nextProps.field)
      .then(this.setErrors)
      .catch(() => {});
  }

  setErrors = debounce(100, errors => this.setState({ errors }));

  getErrors(field) {
    this.getErrorsPromise = makeCancelable(new Promise((resolve) => {
      if (this.getErrorsPromise) this.getErrorsPromise.cancel();

      const getErrors = getOr(() => [], 'getErrors', field);
      const errors = getErrors(field);

      if (errors instanceof Promise) {
        errors.then(resolve);
        return;
      }

      if (isArray(errors)) {
        resolve(errors);
      }

      resolve([]);
    }));

    return this.getErrorsPromise.promise;
  }

  getLabel = () =>
    this.props.field.label || this.props.field.key;

  handleBlur = (e) => {
    const field = getOr({}, 'props.field', this);
    const onBlur = getOr(noop, 'onBlur', field);

    onBlur(e);
  }

  handleChange = (value) => {
    const field = getOr({}, 'props.field', this);
    const onFieldChange = getOr(noop, 'props.onFieldChange', this);


    onFieldChange({
      ...field,
      value,
    });

    this.setState({
      errors: [],
    });
  };

  handleClick = (e) => {
    if (!_.isFunction(this.props.field.onClick)) return;
    this.props.field.onClick(e);
  };

  handleFocus = (e) => {
    const field = getOr({}, 'props.field', this);
    const onFocus = getOr(noop, 'onFocus', field);

    onFocus(e);
  };

  handleIsTouchedChange = (isTouched) => {
    this.props.onFieldChange({
      ...this.props.field,
      isTouched,
    });
  };

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

  render() {
    return h(this.props.field.component, {
      className: this.props.className,
      errors: this.state.errors,
      isTouched: !!this.props.field.isTouched,
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
}
