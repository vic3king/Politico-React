import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import InterestFormModal from '../../../components/Modals/DeclarationForm';
import Interest from '../../../services/interest';
// import errorHandler from '../../../helpers/errorHandler';

jest.mock('react-notify-toast');

const office = [
  {
    name: '',
  },
  {
    name: '',
  },
];
const parties = [
  {
    name: '',
  },
  {
    name: '',
  },
];
const hide = jest.fn();

jest.mock('react-notify-toast');
jest.mock('../../../services/interest');

let wrapper;
describe('InterestFormModal component', () => {
  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');

  beforeEach(() => {
    wrapper = shallow(
      <InterestFormModal offices={office} parties={parties} hide={hide} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('hide method', () => {
    wrapper = shallow(
      <InterestFormModal offices={office} parties={parties} hide={hide} />
    );
    const instance = wrapper.instance();
    let event;
    it('should call preventDefault on event', async () => {
      event = {
        preventDefault: jest.fn(),
      };

      await instance.hide(event);
      expect(event.preventDefault).toBeCalled();
    });
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
        Interest.interestRequest = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 201,
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
      it('should call toast the right message on api call success', async () => {
        await instance.onButtonSubmit(event);
        expect(notify.show).toBeCalledWith(
          'Your request has been recived and is being processed.'
        );
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.onButtonSubmit(event);
        expect(instance.state.loading).toBeFalsy();
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Interest.interestRequest = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            error: {
              error: {
                error: 'validation error',
              },
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

      // it('should set loading state to false on validation error', async () => {
      //   await instance.onButtonSubmit(event);
      //   expect(instance.state.loading).toBeFalsy();
      // });

      // it('should toast the error message', async () => {
      //   const errors = [
      //     {
      //       status: 400,
      //       errors: {
      //         message: 'validation error',
      //       },
      //     },
      //   ];
      //   await instance.onButtonSubmit(event);
      //   expect(notify.show).toBeCalledWith(errorHandler(errors), 'error');
      // });
    });
  });
});
