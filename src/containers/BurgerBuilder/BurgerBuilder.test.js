import { BurgerBuilder } from './BurgerBuilder';
import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/Builder/Builder'
configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} onOrder={() => { }} />);
    });
    it('should render <BuildControls/> when received ings.', () => {
        wrapper.setProps({ ings: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});