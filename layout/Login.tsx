import * as React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button
} from 'reactstrap';

import './Login.css';

export default function(props : IProps) {
    function doLogin() {
        props.updateLogin(true);
    }

    return (
        <div className={"lto-login-container"}>
            <InputGroup className={"lto-login-input mb-2"}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="email" />
            </InputGroup>
            <InputGroup className={"lto-login-input mb-2"}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>***</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="password" />
            </InputGroup>
            <Button color="primary" onClick={doLogin}>
                Login
            </Button>
        </div>
    )
}

interface IProps {
    updateLogin : (value : boolean) => void
}
