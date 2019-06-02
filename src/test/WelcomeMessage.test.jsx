import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../components/Home/Home';

describe('Home component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(<HomePage />));
  });

  it('renders correctly', () => {
    const wrapper = renderer.create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ).toJSON;
    expect(wrapper).toMatchInlineSnapshot(`[Function]`);
  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
