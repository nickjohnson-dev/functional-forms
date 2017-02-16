import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Field } from '../field';

test('should throw when field id property is nil', (t) => {
  const component = shallow(h(Field, {
    field: { component: 'text' },
    onFieldChange: () => {},
  }));
  const fn = () => component.instance().componentDidMount();
  t.throws(fn);
});

test('should throw when getHasValidComponent method returns false', (t) => {
  const getHasValidComponent = () => false;
  class TestField extends Field {
    getHasValidComponent = getHasValidComponent;
  }
  const component = shallow(h(TestField, {
    field: { id: 'a', component: 2 },
    onFieldChange: () => {},
  }));
  const fn = () => component.instance().componentDidMount();
  t.throws(fn);
});

test('should not throw when field id property is not nil, and getHasValidComponent method returns true', (t) => {
  const getHasValidComponent = () => true;
  class TestField extends Field {
    getHasValidComponent = getHasValidComponent;
  }
  const component = shallow(h(TestField, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const fn = () => component.instance().componentDidMount();
  t.notThrows(fn);
});
