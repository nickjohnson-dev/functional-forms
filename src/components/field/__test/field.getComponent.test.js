import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Field } from '../field';

test('should return value of getBuiltInComponent method when field component property is a string', (t) => {
  const builtInComponent = () => h('div');
  const getBuiltInComponent = () => builtInComponent;
  class TestField extends Field {
    getBuiltInComponent = getBuiltInComponent;
  }
  const component = shallow(h(TestField, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const result = component.instance().getComponent();
  t.is(result, builtInComponent);
});

test('should return field component property method when field component property is a function', (t) => {
  const customComponent = () => h('div');
  const component = shallow(h(Field, {
    field: { id: 'a', component: customComponent },
    onFieldChange: () => {},
  }));
  const result = component.instance().getComponent();
  t.is(result, customComponent);
});
