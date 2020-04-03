import * as React from "react";

import Login from '@components/view/login/LoginView';
import {configure, mount} from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Login /> with no props', () => {
    const login = mount(
            <Login
                    updateLogin={() => console.log("Update Login")}
                    emitter={null}
            />
    );

    it('should contain text input for email', () => {
        expect(login.find('input[type="text"]').length).toEqual(1);
    });

    it('should contain password input', () => {
        expect(login.find('input[type="password"]').length).toEqual(1);
    });

});
