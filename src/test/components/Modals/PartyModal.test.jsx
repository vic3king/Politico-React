import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import PartyModal from '../../../components/Modals/PartyModal';
import Party from '../../../services/parties';
import errorHandler from '../../../helpers/errorHandler';

jest.mock('../../../services/interest');
jest.mock('react-notify-toast');

const hide = jest.fn();
const updatePartiesState = jest.fn();

let wrapper;
describe('PartyModal component', () => {
  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');

  beforeEach(() => {
    wrapper = shallow(
      <PartyModal hide={hide} updatePartiesState={updatePartiesState} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('hide method', () => {
    wrapper = shallow(
      <PartyModal hide={hide} updatePartiesState={updatePartiesState} />
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
        Party.postParty = jest.fn().mockImplementation(() =>
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
        expect(notify.show).toBeCalledWith('success');
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.onButtonSubmit(event);
        expect(instance.state.loading).toBeFalsy();
      });
      it('should call the updatePartiesState method with id from api call', async () => {
        await instance.onButtonSubmit(event);
        expect(updatePartiesState).toBeCalled();
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Party.postParty = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            error: 'validation error',
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
