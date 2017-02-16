import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { TextField } from '../../text-field/text-field';
import { Field } from '../field';

test('should return TextField when type is equal to "text"', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = TextField;
  const result = component.instance().getBuiltInComponent();
  t.is(result, expected);
});
