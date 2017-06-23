import debounce from 'lodash/fp/debounce';
import getOr from 'lodash/fp/getOr';
import isArray from 'lodash/fp/isArray';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import noop from 'lodash/fp/noop';
import omit from 'lodash/fp/omit';
import React from 'react';
import h from 'react-hyperscript';
import { makeCancelable } from '../../helpers';
import { NestedForm } from '../NestedForm/NestedForm';

export class Field extends React.PureComponent {
  static propTypes = {
    field: React.PropTypes.object.isRequired,
    onFieldChange: React.PropTypes.func.isRequired,
  };

  messagesPromise;

  componentWillReceiveProps(nextProps) {
    const fieldHasChanged = !isEqual(
      omit(['messages'], this.props.field),
      omit(['messages'], nextProps.field),
    );

    if (fieldHasChanged) {
      this.updateMessages(nextProps.field);
    }
  }

  getComponent = () =>
    getOr(NestedForm, 'props.field.component', this);

  getFields = () => {
    const fields = getOr({}, 'props.field.fields', this);

    return map(
      key => ({
        ...getOr({}, key, fields),
        key,
      }),
      Object.getOwnPropertyNames(fields),
    );
  }

  handleChange = (value) => {
    const field = getOr({}, 'props.field', this);
    const onFieldChange = getOr(noop, 'props.onFieldChange', this);

    onFieldChange({
      ...field,
      isDirty: true,
      value,
    });

    this.setState({
      messages: [],
    });
  };

  handleSubfieldChange = (subField) => {
    const field = getOr({}, 'props.field', this);
    const fields = getOr({}, 'fields', field);
    const onFieldChange = getOr(noop, 'props.onFieldChange', this);

    onFieldChange({
      ...field,
      fields: {
        ...fields,
        [subField.key]: subField,
      },
    });
  }

  handleIsTouchedChange = (isTouched) => {
    this.props.onFieldChange({
      ...this.props.field,
      isTouched,
    });
  };

  handleMessagesChange = debounce(250, (messages) => {
    const field = getOr({}, 'props.field', this);
    const onFieldChange = getOr(noop, 'props.onFieldChange', this);

    onFieldChange({
      ...field,
      messages,
    });
  });

  updateMessages = (field) => {
    this.messagesPromise = makeCancelable(new Promise((resolve) => {
      if (this.messagesPromise) this.messagesPromise.cancel();

      const getMessages = getOr(() => [], 'getMessages', field);
      const messages = getMessages(field);

      if (messages instanceof Promise) {
        messages.then(resolve);
        return;
      }

      if (isArray(messages)) {
        resolve(messages);
      }

      resolve([]);
    }));

    this.messagesPromise.promise
      .then(this.handleMessagesChange)
      .catch(() => {});
  }

  render() {
    return h(this.getComponent(), {
      field: this.props.field,
      onChange: this.handleChange,
      onIsTouchedChange: this.handleIsTouchedChange,
    }, [
      ...this.getFields().map(field => h(Field, {
        key: field.key,
        onFieldChange: this.handleSubfieldChange,
        field,
      })),
    ]);
  }
}
