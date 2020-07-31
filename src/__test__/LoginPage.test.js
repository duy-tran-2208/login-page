import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LoginPage from '../pages/LoginPage/LoginPage';

const mockStore = configureMockStore();
const store = mockStore({});

const setUp = (props = {}) => {
  const component = shallow(
    <Provider store={store}>
      <LoginPage />
    </Provider>
  );
  return component;
};

describe('<LoginPage/>', () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it('Should receive props', () => {
    const login = jest.fn();
    component = setUp({ login });
    expect(login).toBe(component.instance().login);
  });
});
