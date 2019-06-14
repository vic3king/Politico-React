import React from 'react';
import { shallow } from 'enzyme';
import { notify } from 'react-notify-toast';
import ResultsModal from '../../../components/Modals/ResultModal';
import Results from '../../../services/results';
import errorHandler from '../../../helpers/errorHandler';

jest.mock('../../../services/petitions');
jest.mock('react-notify-toast');

const hide = jest.fn();
const officeId = 1;

let wrapper;
describe('PetitionsModal component', () => {
  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');
  beforeEach(() => {
    wrapper = shallow(<ResultsModal hide={hide} officeId={officeId} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('hide method', () => {
    wrapper = shallow(<ResultsModal hide={hide} officeId={officeId} />);
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
        Results.getResults = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
            data: [
              {
                result: '',
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

      it('should call toast the right message on api call success', async () => {
        await instance.componentDidMount();
        expect(notify.show).toBeCalledWith('success');
      });

      it('should toast error when successful but no result exists', async () => {
        Results.getResults = jest.fn().mockImplementation(() =>
          Promise.resolve({
            status: 200,
            data: [],
          })
        );
      });
      it('should call toast the right message on api call success', async () => {
        await instance.componentDidMount();
        expect(notify.show).toBeCalledWith(
          'Result for this election is not yet available',
          'error'
        );
      });
    });

    describe('Api call 400 errors', () => {
      beforeAll(() => {
        Results.getResults = jest.fn().mockImplementation(() =>
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
        await instance.componentDidMount();
        expect(instance.state.loading).toBeFalsy();
      });

      it('should toast the error message', async () => {
        await instance.componentDidMount();
        expect(notify.show).toBeCalledWith(
          errorHandler('validation error'),
          'error'
        );
      });
    });
  });
});
