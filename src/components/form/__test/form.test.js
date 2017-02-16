import { includes } from 'lodash/fp';
import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Form } from '../form';

test('should have className equal to className prop', (t) => {
  const className = 'my-class';
  const component = shallow(h(Form, {
    className,
  }));
  t.true(includes(className, component.prop('className')));
});

test('should have style equal to style prop', (t) => {
  const style = {
    backgroundColor: 'red',
  };
  const component = shallow(h(Form, {
    style,
  }));
  t.deepEqual(component.prop('style'), style);
});
