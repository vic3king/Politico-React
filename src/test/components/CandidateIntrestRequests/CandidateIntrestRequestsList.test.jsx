import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import CandidateIntrestRequestsList from '../../../components/CandidateIntrestRequests/CandidateIntrestRequestList';
import CandidateIntrestRequestsCard from '../../../components/CandidateIntrestRequests/CandidateIntrestRequests';
import NavBar from '../../../components/shared/NavBar/Navbar';
import Interest from '../../../services/interest';
import Vote from '../../../services/votes';
import errorHandler from '../../../helpers/errorHandler';

jest.mock('../../../services/interest');
jest.mock('../../../services/votes');
jest.mock('react-notify-toast');

let wrapper;
describe('CandidateIntrestRequestsList component', () => {
  beforeAll(() => {
    Vote.getCandidatesByStatus = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        data: [
          {
            firstname: '',
          },
          {
            firstname: '',
          },
        ],
      })
    );
  });
  beforeEach(() => {
    wrapper = shallow(<CandidateIntrestRequestsList />);
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain necessary components', () => {
    expect(wrapper.find(<NavBar />)).toBeTruthy();
    expect(wrapper.find(<CandidateIntrestRequestsCard />)).toBeTruthy();
    expect(wrapper.find('div')).toBeTruthy();
    expect(wrapper.find('button')).toBeTruthy();
  });

  describe('ComponentDidMount', () => {
    it('should call componentDidMount method', async () => {
      const instance = wrapper.instance();
      await instance.componentDidMount();

      expect(instance.state.candidates).toEqual([
        {
          firstname: '',
        },
        {
          firstname: '',
        },
      ]);
    });
  });

  describe('updateCandidatesState method', () => {
    it('should remove candidate from state', () => {
      const instance = wrapper.instance();
      instance.setState({
        candidates: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      });

      instance.updateCandidatesState(1);

      expect(
        instance.state.candidates.find(candidate => {
          return candidate.id === 1;
        })
      ).toBeFalsy();
    });
  });

  describe('adminAcceptReject method', () => {
    let instance;
    let event;
    describe('Api call success', () => {
      beforeAll(() => {
        Interest.processRequest = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
        event = {
          preventDefault: jest.fn(),
          target: { id: 2 },
        };
      });
      it('should call preventDefault on event', async () => {
        await instance.adminAcceptRequest(event);

        expect(event.preventDefault).toBeCalled();
      });

      it('should call toast the right message on api call success', async () => {
        await instance.adminAcceptRequest(event);
        expect(notify.show).toBeCalledWith('Candidate Approved');
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.adminAcceptRequest(event);
        expect(instance.state.loading).toBeFalsy();
      });
      it('should call the updateCandidatesState method with id from api call', async () => {
        const updateCandidatesState = jest.spyOn(
          instance,
          'updateCandidatesState'
        );
        await instance.adminAcceptRequest(event);
        expect(updateCandidatesState).toBeCalledWith(2);
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Interest.processRequest = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            errors: {
              message: 'validation error',
            },
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
        event = {
          preventDefault: jest.fn(),
          target: { id: 2 },
        };
      });

      it('should set loading state to false on validation error', async () => {
        await instance.adminAcceptRequest(event);
        expect(instance.state.loading).toBeFalsy();
      });

      it('should toast the error message', async () => {
        await instance.adminAcceptRequest(event);
        expect(notify.show).toBeCalledWith(
          errorHandler('validation error'),
          'error'
        );
      });
    });
  });

  describe('adminRejectRequest method', () => {
    let instance;
    let event;
    describe('Api call success', () => {
      beforeAll(() => {
        Interest.processRequest = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
        event = {
          preventDefault: jest.fn(),
          target: { id: 2 },
        };
      });
      it('should call preventDefault on event', async () => {
        await instance.adminRejectRequest(event);

        expect(event.preventDefault).toBeCalled();
      });

      it('should call toast the right message on api call success', async () => {
        await instance.adminRejectRequest(event);
        expect(notify.show).toBeCalledWith('Candidate Rejected');
      });
      it('should set loading state to false after successfull api call is made', async () => {
        await instance.adminRejectRequest(event);
        expect(instance.state.loading).toBeFalsy();
      });
      it('should call the updateCandidatesState method with id from api call', async () => {
        const updateCandidatesState = jest.spyOn(
          instance,
          'updateCandidatesState'
        );
        await instance.adminRejectRequest(event);
        expect(updateCandidatesState).toBeCalledWith(2);
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Interest.processRequest = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            errors: {
              message: 'validation error',
            },
          })
        );
      });
      beforeEach(() => {
        instance = wrapper.instance();
        event = {
          preventDefault: jest.fn(),
          target: { id: 2 },
        };
      });

      it('should set loading state to false on validation error', async () => {
        await instance.adminRejectRequest(event);
        expect(instance.state.loading).toBeFalsy();
      });

      it('should toast the error message', async () => {
        await instance.adminRejectRequest(event);
        expect(notify.show).toBeCalledWith(
          errorHandler('validation error'),
          'error'
        );
      });
    });
  });
});
