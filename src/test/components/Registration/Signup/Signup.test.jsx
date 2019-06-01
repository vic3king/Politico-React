import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import Signup from '../../../../components/Registration/Signup';
import authServices from '../../../../services/authentication.services';
import errorHandler from '../../../../helpers/errorHandler';

jest.mock('../../../../services/authentication.services');
jest.mock('react-notify-toast');

let wrapper;
describe('SignUp component', () => {
  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');
  beforeEach(() => {
    wrapper = shallow(<Signup />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a form tag', () => {
    expect(wrapper.find('form'));
    expect(wrapper.hasClass('signbox'));
  });

  describe('onInputChange method', () => {
    it('should update formData state ', () => {
      const instance = wrapper.instance();
      const event = {
        preventDefault: jest.fn(),
        target: { id: 'office' },
      };
      const formDetails = {
        name: 'test',
      };
      instance.setState({
        formDetails,
      });

      instance.onInputChange(event);

      expect(instance.state.formDetails).toEqual({
        name: 'test',
      });
    });
  });

  describe('onButtonSubmit method', () => {
    let instance;
    let event;

    describe('Api call success', () => {
      beforeAll(() => {
        authServices.auth = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 201,
            data: [
              {
                user: {
                  type: 'admin',
                },
              },
            ],
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
        event = {
          preventDefault: jest.fn(),
        };
      });

      it('should call preventDefault on event', async () => {
        await instance.onButtonSubmit(event);

        expect(event.preventDefault).toBeCalled();
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.onButtonSubmit(event);
        expect(instance.state.loading).toBeTruthy();
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        authServices.auth = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            error: {
              message: [{ error: 'validation error' }],
            },
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
        event = {
          preventDefault: jest.fn(),
        };
      });

      it('should set loading state to false on validation error', async () => {
        await instance.onButtonSubmit(event);
        expect(instance.state.loading).toBeFalsy();
      });

      it('should toast the error message', async () => {
        await instance.onButtonSubmit(event);
        expect(notify.show).toBeCalledWith(
          errorHandler('validation error'),
          'error'
        );
      });
    });
  });
});
