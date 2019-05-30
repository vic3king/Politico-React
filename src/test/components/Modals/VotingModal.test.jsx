import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import VotingModal from '../../../components/Modals/VotingModal';
import Votes from '../../../services/votes';
import errorHandler from '../../../helpers/errorHandler';

jest.mock('../../../services/votes');
jest.mock('react-notify-toast');

const hide = jest.fn();
const officeId = 1;

let wrapper;
describe('VotingModal component', () => {
  beforeEach(() => {
    wrapper = shallow(<VotingModal hide={hide} officeId={officeId} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('hide method', () => {
    wrapper = shallow(<VotingModal hide={hide} officeId={officeId} />);
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

  describe('componentDidMount method', () => {
    let instance;
    describe('Api call success', () => {
      beforeAll(() => {
        Votes.getCandidatesByOffice = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
            data: [
              {
                office: '',
              },
            ],
          })
        );
      });

      beforeEach(() => {
        instance = wrapper.instance();
      });

      it('should set loading state to false after successfull api call is made', async () => {
        await instance.componentDidMount();

        expect(instance.state.loading).toBeFalsy();
      });

      it('should toast error when successful but no result exists', async () => {
        Votes.getCandidatesByOffice = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
            data: [],
          })
        );
        await instance.componentDidMount();
        expect(notify.show).toBeCalledWith('No candidates available', 'error');
      });
    });
  });

  describe('Api call 400 errors', () => {
    let instance;
    beforeAll(() => {
      Votes.getCandidatesByOffice = jest.fn().mockImplementation(() =>
        Promise.resolve({
          status: 400,
          error: 'error',
        })
      );
    });

    beforeEach(() => {
      instance = wrapper.instance();
    });

    it('should set loading state to false on validation error', async () => {
      await instance.componentDidMount();
      expect(instance.state.loading).toBeFalsy();
    });

    it('should toast the error message', async () => {
      await instance.componentDidMount();
      expect(notify.show).toBeCalledWith(errorHandler('error'), 'error');
    });
  });

  //   describe('Api call 400 errors', () => {
  //     beforeAll(() => {
  //       Votes.getCandidatesByOffice = jest.fn().mockImplementation(() =>
  //         Promise.resolve({
  //           status: 400,
  //           error: {
  //             message: 'validation error',
  //           },
  //         })
  //       );
  //     });
  //     beforeEach(() => {
  //       instance = wrapper.instance();
  //       event = {
  //         preventDefault: jest.fn(),
  //       };
  //     });

  //     it('should set loading state to false on validation error', async () => {
  //       await instance.onButtonSubmit(event);
  //       expect(instance.state.loading).toBeFalsy();
  //     });

  //     it('should toast the error message', async () => {
  //       await instance.onButtonSubmit(event);
  //       expect(notify.show).toBeCalledWith(
  //         errorHandler('validation error'),
  //         'error'
  //       );
  //     });
  //   });
  // });

  describe('onButtonSubmit method', () => {
    let instance;
    let event;

    describe('Api call success', () => {
      beforeAll(() => {
        Votes.voteCandidate = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 201,
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
      it('should call the hide method to close the modal after success', async () => {
        await instance.onButtonSubmit(event);
        expect(hide).toBeCalled();
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Votes.voteCandidate = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 400,
            error: {
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
