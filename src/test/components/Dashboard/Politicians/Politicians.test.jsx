import React from 'react';
import { shallow } from 'enzyme';
import PoliticiansPage from '../../../../components/Dashboard/Politicians/Politicians';
import Offices from '../../../../services/offices';
import Party from '../../../../services/parties';

jest.mock('../../../../services/offices');
jest.mock('../../../../services/parties');

let wrapper;

describe('PoliticiansPage', () => {
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
    wrapper = shallow(<PoliticiansPage />);
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

  describe('showPetitionsModal method', () => {
    it('should set showPetitionsModal to true and set showIntrestsModal to false', () => {
      const instance = wrapper.instance();
      instance.setState({
        showPetitionsModal: true,
        showIntrestsModal: false,
      });

      instance.showPetitionsModal();

      expect(instance.state.showPetitionsModal).toBeTruthy();
      expect(instance.state.showIntrestsModal).toBeFalsy();
    });
  });

  describe('showIntrestsModal method', () => {
    it('should set showIntrestsModal to true and set showPetitionsModal to false', () => {
      const instance = wrapper.instance();
      instance.setState({
        showIntrestsModal: true,
        showPetitionsModal: false,
      });

      instance.showIntrestsModal();

      expect(instance.state.showIntrestsModal).toBeTruthy();
      expect(instance.state.showPetitionsModal).toBeFalsy();
    });
  });

  describe('hidePetitionsModal method', () => {
    it('should set showPetitionsModal to false', () => {
      const instance = wrapper.instance();
      instance.setState({
        showPetitionsModal: false,
      });

      instance.hidePetitionsModal();

      expect(instance.state.showPetitionsModal).toBeFalsy();
    });
  });

  describe('hideIntrestsModal method', () => {
    it('should set showIntrestsModal to false', () => {
      const instance = wrapper.instance();
      instance.setState({
        showIntrestsModal: false,
      });

      instance.hideIntrestsModal();

      expect(instance.state.showIntrestsModal).toBeFalsy();
    });
  });
});
