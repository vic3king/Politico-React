import React from 'react';
import { shallow } from 'enzyme';
import ResultsPage from '../../../components/Results/ResultsPage';

import Offices from '../../../services/offices';

jest.mock('../../../services/offices');

let wrapper;

describe('ResultsPage', () => {
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
  });

  beforeEach(() => {
    wrapper = shallow(<ResultsPage />);
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
    });
  });

  // describe('showOfficeModal method', () => {
  //   it('should set showResultsModal to true and get and ID', () => {
  //     const instance = wrapper.instance();
  //     const e = {
  //       target: { id: 1 },
  //     };

  //     instance.setState({
  //       showResultsModal: true,
  //     });

  //     instance.showOfficeModal(e);

  //     expect(instance.state.showResultsModal).toBeTruthy();
  //     expect(instance.state.officeId).toBe(2);
  //   });
  // });

  describe('hideResultsModal method', () => {
    it('should set showResultsModal to false ', () => {
      const instance = wrapper.instance();
      instance.setState({
        showResultsModal: false,
      });

      instance.hideResultsModal();

      expect(instance.state.showResultsModal).toBeFalsy();
    });
  });
});
