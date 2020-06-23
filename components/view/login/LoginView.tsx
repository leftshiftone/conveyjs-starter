import * as React from 'react';
import {useState} from 'react';
import {Button, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

import Emitter from '@lib/emitter/Emitter';

import './LoginView.css';

export default function (props: IProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function doLogin() {
        props.updateLogin(true);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div className={"lto-login-container"}>
            <InputGroup className={"lto-login-input mb-2"}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
                <Input onChange={updateEmail}
                       placeholder="email"
                />
            </InputGroup>
            <InputGroup className={"lto-login-input mb-2"}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>***</InputGroupText>
                </InputGroupAddon>
                <Input onChange={updatePassword} type="password"
                       placeholder="password"
                />
            </InputGroup>
            <Button color="primary" onClick={doLogin}>
                Login
            </Button>
        </div>
    )
}

interface IProps {
    updateLogin: (value: boolean) => void
    emitter: Emitter
}
