import getOr from 'lodash/fp/getOr';
import isArray from 'lodash/fp/isArray';
import React from 'react';
import h from 'react-hyperscript';

export class NestedForm extends React.PureComponent {
  static propTypes = {
    children: React.PropTypes.node,
    field: React.PropTypes.object.isRequired,
  };

  getChildren = () => {
    const children = getOr([], 'props.children', this);

    if (!isArray(children)) {
      return [children];
    }

    return children;
  }

  getLabel = () =>
    getOr('', 'props.field.label', this);

  render() {
    return h('div', {
      className: this.props.className,
    }, [
      h('label', [
        this.getLabel(),
      ]),
      ...this.getChildren(),
    ]);
  }
}
