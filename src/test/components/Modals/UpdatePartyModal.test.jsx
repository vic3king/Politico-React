import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import UpdatePartyModal from '../../../components/Modals/UpdatePartyModal';
import Party from '../../../services/parties';
import errorHandler from '../../../helpers/errorHandler';

jest.mock('react-notify-toast');
jest.mock('../../../services/parties');

const hide = jest.fn();
const updatePartiesName = jest.fn();
const partyId = 1;

let wrapper;
describe('InterestFormModal component', () => {
  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');

  beforeEach(() => {
    wrapper = shallow(
      <UpdatePartyModal
        updatePartiesName={updatePartiesName}
        hide={hide}
        partyId={partyId}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('hide method', () => {
    wrapper = shallow(
      <UpdatePartyModal
        updatePartiesName={updatePartiesName}
        hide={hide}
        partyId={partyId}
      />
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

  describe('handleUpdate method', () => {
    let instance;

    describe('Api call success', () => {
      beforeAll(() => {
        Party.updateParty = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
            message: 'toast message',
            data: {
              name: 'test',
            },
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
      });

      it('should call toast the right message on api call success', async () => {
        await instance.handleUpdate();
        expect(notify.show).toBeCalledWith('toast message');
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.handleUpdate();
        expect(instance.state.loading).toBeFalsy();
      });
      it('should call the updatePartiesName method with id from api call', async () => {
        await instance.handleUpdate();
        expect(updatePartiesName).toBeCalledWith(1, 'test');
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Party.updateParty = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            error: 'validation error',
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
      });

      it('should set loading state to false on validation error', async () => {
        await instance.handleUpdate();
        expect(instance.state.loading).toBeFalsy();
      });

      it('should toast the error message', async () => {
        await instance.handleUpdate();
        expect(notify.show).toBeCalledWith(
          errorHandler('validation error'),
          'error'
        );
      });
    });
  });
});
