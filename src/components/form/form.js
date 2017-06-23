import getOr from 'lodash/fp/getOr';
import map from 'lodash/fp/map';
import noop from 'lodash/fp/noop';
import React from 'react';
import h from 'react-hyperscript';
import StylePropType from 'react-style-proptype';
import { Field } from '../field/field';

export class Form extends React.PureComponent {
  static propTypes = {
    className: React.PropTypes.string,
    fields: React.PropTypes.object.isRequired,
    onFieldsChange: React.PropTypes.func,
    style: StylePropType,
  };

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

  render() {
    return h('div', {
      className: this.props.className,
      style: this.props.style,
    }, [
      this.getFields().map(field => h(Field, {
        key: field.key,
        onFieldChange: this.handleFieldChange,
        field,
      })),
    ]);
  }
}
