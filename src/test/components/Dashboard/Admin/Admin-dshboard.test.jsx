import React from 'react';
import { shallow } from 'enzyme';
import AdminPage from '../../../../components/Dashboard/Admin/Admin';
import Offices from '../../../../services/offices';
import Party from '../../../../services/parties';

jest.mock('../../../../services/offices');
jest.mock('../../../../services/parties');

let wrapper;

describe('AdminPage', () => {
  beforeAll(() => {
    Offices.getAllOffices = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [
          {
            name: '',
          },
          {
            name: '',
          },
        ],
      })
    );

    Party.getAllParties = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [
          {
            id: 1,
            name: '',
          },
          {
            id: 2,
            name: '',
          },
        ],
      })
    );
  });

  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');

  beforeEach(() => {
    wrapper = shallow(<AdminPage />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('ComponentDidMount', () => {
    it('should call componentDidMount method', async () => {
      const instance = wrapper.instance();
      await instance.componentDidMount();

      expect(instance.state.offices).toEqual([
        {
          name: '',
        },
        {
          name: '',
        },
      ]);

      expect(instance.state.parties).toEqual([
        {
          id: 1,
          name: '',
        },
        {
          id: 2,
          name: '',
        },
      ]);
    });
  });

  describe('updateOfficesState method', () => {
    it('should add a new office to state', () => {
      const instance = wrapper.instance();
      const newUpdate = { name: 'President' };

      instance.updateOfficesState(newUpdate);

      expect(
        instance.state.offices.find(office => {
          return office.name === 'President';
        })
      ).toBeTruthy();
    });
  });

  describe('updatePartiesState method', () => {
    it('should add a new party to state', () => {
      const instance = wrapper.instance();
      const newUpdate = { name: 'APC' };

      instance.updatePartiesState(newUpdate);

      expect(
        instance.state.parties.find(party => {
          return party.name === 'APC';
        })
      ).toBeTruthy();
    });
  });

  describe('updatePartiesName method', () => {
    it('should update the name of a party', () => {
      const instance = wrapper.instance();

      instance.updatePartiesName(1, 'test');

      expect(
        instance.state.parties.find(party => {
          return party.name === 'test';
        })
      ).toBeTruthy();
    });
  });

  describe('updateDeletePartyState method', () => {
    it('should remove candidate from state', () => {
      const instance = wrapper.instance();

      instance.updateDeletePartyState(2);

      expect(
        instance.state.parties.find(party => {
          return party.id === 2;
        })
      ).toBeFalsy();
    });
  });

  describe('showOfficeModal method', () => {
    it('should set showPetitionsModal to true ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showOfficeModal: true,
        showPartyModal: false,
      });

      instance.showOfficeModal();

      expect(instance.state.showOfficeModal).toBeTruthy();

      expect(instance.state.showPartyModal).toBeFalsy();
    });
  });

  describe('showPartyModal method', () => {
    it('should set showPartyModal to true and set showOfficeModal to false', () => {
      const instance = wrapper.instance();
      instance.setState({
        showOfficeModal: false,
        showPartyModal: true,
      });

      instance.showPartyModal();

      expect(instance.state.showPartyModal).toBeTruthy();

      expect(instance.state.showOfficeModal).toBeFalsy();
    });
  });

  describe('hideOfficeModal method', () => {
    it('should set showOfficeModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showOfficeModal: false,
      });

      instance.hideOfficeModal();

      expect(instance.state.showOfficeModal).toBeFalsy();
    });
  });

  describe('hidePartyModal method', () => {
    it('should set showPartyModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showPartyModal: false,
      });

      instance.hidePartyModal();

      expect(instance.state.showPartyModal).toBeFalsy();
    });
  });
});
