import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Form } from '../form';

test('should invoke onFieldsChange prop with fields containing updated field', (t) => {
  const fields = [
    { id: 'a', value: 'Value 1' },
    { id: 'b', value: 'Value 2' },
  ];
  const onFieldsChange = sinon.spy();
  const component = shallow(h(Form, {
    fields,
    onFieldsChange,
  }));
  const updatedField = { id: 'a', value: 'Value 3' };
  const expected = [[
    { id: 'a', value: 'Value 3' },
    { id: 'b', value: 'Value 2' },
  ]];
  component.instance().handleFieldChange(updatedField);
  t.deepEqual(onFieldsChange.lastCall.args, expected);
});
