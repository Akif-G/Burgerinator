import React from 'react'
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem/NavigationItem'
import NavigationItems from './NavigationItems'

configure({ adapter:new Adapter()});

//Test::
/* 
test the crucial things that changes depending onn external influences. 
So not test libraries (Axios, react, dom),
*/

describe('<NavigationItems />',()=>{
    let wrapper;
    //need it to have empty slot before each render of a test.
    beforeEach(()=>{
        wrapper =shallow(<NavigationItems/>);
    });

    it('should render 2 <NavigationItem/> elements if not authenticated',()=>{
        expect(wrapper.find(NavigationItem))
        .toHaveLength(2);
    });
    
    it('should render 3 <NavigationItem/> elements if authenticated',()=>{
        //wrapper=shallow(<NavigationItems isAuth/>)
        wrapper.setProps({
            isAuth:true,
            });
        expect(wrapper.find(NavigationItem))
        .toHaveLength(3);
        
    });
    it('should render <NavigationItem/> LOGOUT element if authenticated',()=>{
        //wrapper=shallow(<NavigationItems isAuth/>)
        wrapper.setProps({
            isAuth:true,
            });
        expect(wrapper.contains( <NavigationItem link="/logout" >Log Out</NavigationItem>))
        .toEqual(true); 
    });
});