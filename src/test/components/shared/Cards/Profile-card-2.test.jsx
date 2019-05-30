import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import ProfileBottomSectionCard from '../../../../components/shared/Cards/Profile-card-2';
import Party from '../../../../services/parties';
// import errorHandler from '../../../../helpers/errorHandler';

const parties = [];
const updatePartiesName = 'test';
const updateDelete = jest.fn();
const hidePartyModal = jest.fn();
const hideOfficeModal = jest.fn();
const partyId = 2;

jest.mock('react-notify-toast');
jest.mock('../../../../services/parties');
let wrapper;

describe('ProfileBottomSectionCard component', () => {
  beforeEach(() => {
    wrapper = shallow(
      <ProfileBottomSectionCard
        parties={parties}
        updatePartiesName={updatePartiesName}
        updateDelete={updateDelete}
        hideOfficeModal={hideOfficeModal}
        hidePartyModal={hidePartyModal}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a div tag', () => {
    expect(wrapper.find('div'));
  });

  describe('handlePageClick method', () => {
    wrapper = shallow(
      <ProfileBottomSectionCard
        parties={parties}
        updatePartiesName={updatePartiesName}
        updateDelete={updateDelete}
        hideOfficeModal={hideOfficeModal}
        hidePartyModal={hidePartyModal}
      />
    );
    it('should set pagination currentPage state with ID', () => {
      const instance = wrapper.instance();
      const e = {
        target: { id: 2 },
      };

      instance.handlePageClick(e);

      expect(instance.state.currentPage).toBe(2);
    });
  });

  describe('hide method', () => {
    const instance = wrapper.instance();
    it('should call hideOfficeModal and hidePartyModal', async () => {
      await instance.hide();
      expect(hideOfficeModal).toBeCalled();
      expect(hidePartyModal).toBeCalled();
    });
  });

  describe('showUpdateModal method', () => {
    const instance = wrapper.instance();
    let event;
    it('should call showUpdateModal and setSate', async () => {
      event = {
        preventDefault: jest.fn(),
        target: { id: 2 },
      };

      await instance.showUpdateModal(event);
      expect(instance.state.showUpdateModal).toBeTruthy();
      expect(instance.state.showDeleteModal).toBeFalsy();
    });
  });

  describe('showDeleteModal method', () => {
    const instance = wrapper.instance();
    let event;
    it('should call showDeleteModal and setSate', async () => {
      event = {
        preventDefault: jest.fn(),
        target: { id: 2 },
      };

      await instance.showDeleteModal(event);
      expect(instance.state.showDeleteModal).toBeTruthy();
      expect(instance.state.showUpdateModal).toBeFalsy();
    });
  });

  describe('hideUpdateModal method', () => {
    it('should set showUpdateModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        hideUpdateModal: false,
      });

      instance.hideUpdateModal();

      expect(instance.state.showUpdateModal).toBeFalsy();
    });
  });

  describe('hideDeleteModal method', () => {
    it('should set showUpdateModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showDeleteModal: false,
      });

      instance.hideDeleteModal();

      expect(instance.state.showDeleteModal).toBeFalsy();
    });
  });

  describe('handleDelete method', () => {
    let instance;

    describe('Api call success', () => {
      beforeAll(() => {
        Party.deleteParty = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
            message: 'success message',
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
      });

      it('should call toast the right message on api call success', async () => {
        await instance.handleDelete(partyId);
        expect(notify.show).toBeCalledWith('success message');
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.handleDelete(partyId);
        expect(instance.state.loading).toBeFalsy();
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
      });

      it('should set loading state to false on validation error', async () => {
        await instance.handleDelete(partyId);
        expect(instance.state.loading).toBeFalsy();
      });

      //   it('should toast the error message', async () => {
      //     await instance.handleDelete(partyId);
      //     expect(notify.show).toBeCalledWith(
      //       errorHandler('validation error'),
      //       'error'
      //     );
      //   });
    });
  });
});
