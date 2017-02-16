import { includes } from 'lodash/fp';
import test from 'ava';
import h from 'react-hyperscript';
import { shallow } from 'enzyme';
import { Field } from '../field';

test('should be defined', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  t.is(component.length, 1);
});

test('should have name equal to return value of getComponent method', (t) => {
  const comp = () => h('div', {});
  const getComponent = () => comp;
  class TestField extends Field {
    getComponent = getComponent;
  }
  const component = shallow(h(TestField, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  t.true(component.is(comp));
});

test('should have className equal to className prop', (t) => {
  const className = 'my-class';
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
    className,
  }));
  t.true(includes(className, component.prop('className')));
});

test('should have errors equal to return value of getErrors method', (t) => {
  const errors = ['An error'];
  const getErrors = () => errors;
  class TestField extends Field {
    getErrors = getErrors;
  }
  const component = shallow(h(TestField, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
    errors,
  }));
  t.deepEqual(component.prop('errors'), errors);
});

test('should have isTouched equal to field isTouched property', (t) => {
  const isTouched = true;
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text', isTouched },
    onFieldChange: () => {},
  }));
  t.deepEqual(component.prop('isTouched'), isTouched);
});

test('should have label equal to return value of getLabel method', (t) => {
  const label = 'A Label';
  const getLabel = () => label;
  class TestField extends Field {
    getLabel = getLabel;
  }
  const component = shallow(h(TestField, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
    label,
  }));
  t.deepEqual(component.prop('label'), label);
});

test('should have onBlur equal to handleBlur method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleBlur;
  t.deepEqual(component.prop('onBlur'), expected);
});

test('should have onChange equal to handleChange method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleChange;
  t.deepEqual(component.prop('onChange'), expected);
});

test('should have onClick equal to handleClick method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleClick;
  t.deepEqual(component.prop('onClick'), expected);
});

test('should have onFocus equal to handleFocus method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleFocus;
  t.deepEqual(component.prop('onFocus'), expected);
});

test('should have onIsTouchedChange equal to handleIsTouchedChange method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleIsTouchedChange;
  t.deepEqual(component.prop('onIsTouchedChange'), expected);
});

test('should have onKeyDown equal to handleKeyDown method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleKeyDown;
  t.deepEqual(component.prop('onKeyDown'), expected);
});

test('should have onKeyPress equal to handleKeyPress method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleKeyPress;
  t.deepEqual(component.prop('onKeyPress'), expected);
});

test('should have onKeyUp equal to handleKeyUp method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleKeyUp;
  t.deepEqual(component.prop('onKeyUp'), expected);
});

test('should have onMouseDown equal to handleMouseDown method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleMouseDown;
  t.deepEqual(component.prop('onMouseDown'), expected);
});

test('should have onMouseUp equal to handleMouseUp method', (t) => {
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text' },
    onFieldChange: () => {},
  }));
  const expected = component.instance().handleMouseUp;
  t.deepEqual(component.prop('onMouseUp'), expected);
});

test('should have value equal to field value property', (t) => {
  const value = 'Some Value';
  const component = shallow(h(Field, {
    field: { id: 'a', component: 'text', value },
    onFieldChange: () => {},
  }));
  t.deepEqual(component.prop('value'), value);
});
