import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Form } from '../form';

const selector = '.ff-form .ff-form__field';

test('should be defined once for each field in fields', (t) => {
  const fields = [
    { id: 'a', value: 'Value 1' },
    { id: 'b', value: 'Value 2' },
  ];
  const component = shallow(h(Form, {
    fields,
  }));
  const fieldEls = component.find(selector);
  t.deepEqual(fieldEls.length, fields.length);
});

test('should have key equal to field id property', (t) => {
  const fields = [
    { id: 'a', value: 'Value 1' },
  ];
  const component = shallow(h(Form, {
    fields,
  }));
  const fieldEl = component.find(selector).first();
  t.deepEqual(fieldEl.node.key, fields[0].id);
});

test('should have onFieldChange equal to handleFieldChange method', (t) => {
  const fields = [
    { id: 'a', value: 'Value 1' },
  ];
  const component = shallow(h(Form, {
    fields,
  }));
  const fieldEl = component.find(selector).first();
  const expected = component.instance().handleFieldChange;
  t.is(fieldEl.prop('onFieldChange'), expected);
});
