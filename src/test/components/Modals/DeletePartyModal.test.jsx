import React from 'react';
import { shallow } from 'enzyme';
import DeletePartModal from '../../../components/Modals/DeletePartyModal';

const hide = jest.fn();
const handleDelete = jest.fn();
let wrapper;
describe('InterestFormModal component', () => {
  global.fetch = jest.fn();
  global.localStorage.setItem('user', '{}');

  beforeEach(() => {
    wrapper = shallow(
      <DeletePartModal handleDelete={handleDelete} hide={hide} />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('hide method', () => {
    wrapper = shallow(
      <DeletePartModal handleDelete={handleDelete} hide={hide} />
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

  describe('handleDelete method', () => {
    wrapper = shallow(
      <DeletePartModal handleDelete={handleDelete} hide={hide} />
    );
    const instance = wrapper.instance();
    let event;
    it('should call preventDefault on event', async () => {
      event = {
        preventDefault: jest.fn(),
      };

      await instance.handleDelete(event);
      expect(event.preventDefault).toBeCalled();
    });
  });
});
