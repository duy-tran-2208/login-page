import { shallow, mount } from 'enzyme';
import React from 'react';
import Input from '../Input';

const setUp = (props = {}) => {
  const component = shallow(<Input {...props} />);
  return component;
};

describe('<Input/>', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = component.find('.error-container');
    expect(wrapper.length).toBe(1);
  });

  it('Should render input element', () => {
    const mockRef = {};
    const input = component.find('input');
    input.getElement().ref(mockRef);
    expect(mockRef).toEqual({});
  });

  it('Should render error element', () => {
    const mockRef = {};
    const error = component.find('.error-container');
    error.getElement().ref(mockRef);
    expect(mockRef).toEqual({});
  });

  it('Should render line element', () => {
    const mockRef = {};
    const line = component.find('.line');
    line.getElement().ref(mockRef);
    expect(mockRef).toEqual({});
  });

  it('Should execute onChange() prop when input is being typed', () => {
    const baseProp = {
      onChange: jest.fn(),
    };
    component = mount(<Input {...baseProp} />);

    const input = component.find('input');
    input.simulate('change', { target: { value: 'some value' } });

    const changeStatus = jest.fn();

    expect(baseProp.onChange).toHaveBeenCalled();
  });
});
