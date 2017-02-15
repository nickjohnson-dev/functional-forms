import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Form } from './form';

test('should be defined', (t) => {
  const component = shallow(h(Form));
  t.is(component.length, 1);
});

test('should have correct className', (t) => {
  const component = shallow(h(Form));
  const result = component.prop('className');
  t.true(result.includes('ff-form'));
});
