import React from 'react';
import { shallow } from 'enzyme';
import ProfileTopSectionCard from '../../../../components/shared/Cards/Profile-card-1';

const offices = [];
const value = 1;
const handleEvent = jest.fn();

jest.mock('../../../../services/offices');
jest.mock('../../../../services/parties');

describe('ProfileTopSectionCard component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <ProfileTopSectionCard
        offices={offices}
        value={value}
        handleEvent={handleEvent}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a div tag', () => {
    const wrapper = shallow(
      <ProfileTopSectionCard
        offices={offices}
        value={value}
        handleEvent={handleEvent}
      />
    );
    expect(wrapper.find('div'));
  });

  describe('handlePageClick method', () => {
    const wrapper = shallow(
      <ProfileTopSectionCard
        offices={offices}
        value={value}
        handleEvent={handleEvent}
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
});
