import getOr from 'lodash/fp/getOr';
import map from 'lodash/fp/map';
import noop from 'lodash/fp/noop';
import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { Field } from '../field/field';

export class Form extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    fields: React.PropTypes.object.isRequired,
    onFieldsChange: React.PropTypes.func,
    onFieldTouch: React.PropTypes.func,
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
      this.getFields().map(field => h(Field, {
        className: 'ff-form__field',
        key: field.key,
        onFieldChange: this.handleFieldChange,
        onFieldTouch: this.props.onFieldTouch,
        field,
      })),
    ]);
  }

  getFields = () => {
    const fields = getOr({}, 'props.fields', this);

    return map(
      key => ({
        ...getOr({}, key, fields),
        key,
      }),
      Object.getOwnPropertyNames(fields),
    );
  }

  handleFieldChange = (field) => {
    const fields = getOr({}, 'props.fields', this);
    const onFieldsChange = getOr(noop, 'props.onFieldsChange', this);

    onFieldsChange({
      ...fields,
      [field.key]: field,
    });
  }
}
