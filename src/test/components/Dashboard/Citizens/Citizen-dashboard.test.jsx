import React from 'react';
import { shallow } from 'enzyme';
import CitizensPage from '../../../../components/Dashboard/Citizens/Citizens';
import Offices from '../../../../services/offices';

jest.mock('../../../../services/offices');

let wrapper;
describe('CitizensPage component', () => {
  beforeAll(() => {
    Offices.getAllOffices = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [
          {
            office: '',
          },
          {
            office: '',
          },
        ],
      })
    );
  });

  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');

  beforeEach(() => {
    wrapper = shallow(<CitizensPage />);
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
          office: '',
        },
        {
          office: '',
        },
      ]);
    });
  });

  describe('hidePetitionsModal method', () => {
    it('should set showPetitionsModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showPetitionsModal: false,
      });

      instance.hidePetitionsModal();

      expect(instance.state.showPetitionsModal).toBeFalsy();
    });
  });

  describe('hideVotingModal method', () => {
    it('should set showVotingModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showVotingModal: false,
      });

      instance.hideVotingModal();

      expect(instance.state.showVotingModal).toBeFalsy();
    });
  });

  describe('showPetitionsModal method', () => {
    it('should set showPetitionsModal to true ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showPetitionsModal: true,
      });

      instance.showPetitionsModal();

      expect(instance.state.showPetitionsModal).toBeTruthy();
    });
  });

  describe('showVotingModal method', () => {
    it('should set showPetitionsModal to true and get and ID', () => {
      const instance = wrapper.instance();
      const e = {
        target: { id: 2 },
      };

      instance.setState({
        showVotingModal: true,
      });

      instance.showVotingModal(e);

      expect(instance.state.showVotingModal).toBeTruthy();
      expect(instance.state.officeId).toBe(2);
    });
  });
});
