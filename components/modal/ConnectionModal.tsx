import React, {useEffect, useState} from 'react';

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {ConnectionListener, ConnectionState} from "@lib/convey/ConnectionListener";

import {interval} from "rxjs";
import {timeout} from "rxjs/operators";

const initError = {
    title: "",
    message: "",
    buttonLabel: ""
};

export default function () {
    const [modal, setModal] = useState(false);
    const [error, setError] = useState<ErrorObject>(initError);

    const toggle = () => setModal(!modal);
    const connectionLost = interval(5000);

    let connectionLostSub;
    let ConState = ConnectionListener.ConState.asObservable();

    const subscription = ConState.subscribe(data => {
        switch (data) {
            case ConnectionState.CONNECTION_LOST:
                // Wait 5 seconds in case reconnect is successful
                connectionLostSub = connectionLost.pipe(timeout(5100)).subscribe(value => {
                    setError({
                        title: "Connection lost",
                        message: "Trying to reconnect!",
                        buttonLabel: "OK"
                    });
                    setModal(true);
                });
                return;
            case ConnectionState.DISCONNECTED:
                setError({
                    title: "Disconnected from server",
                    message: "Connection to server has been disconnected.",
                    buttonLabel: "OK"
                });
                break;
            case ConnectionState.TIMEOUT:
                setError({
                    title: "Timeout",
                    message: "A timeout occurred.",
                    buttonLabel: "OK"
                });
                break;
            case ConnectionState.BAD_CONNECTION:
                setError({
                    title: "Bad connection",
                    message: "Please check your internet connectivity",
                    buttonLabel: "OK"
                });
                break;
            default : // ConnectionState.CONNECTED
                setModal(false);
                if (connectionLostSub) {
                    connectionLostSub.unsubscribe();
                }
                setError(initError);
                return;
        }

        setModal(true);
    });

    // clean-up on unmount
    useEffect(() => {
        return (() => {
            subscription.unsubscribe();
            if (connectionLostSub) {
                connectionLostSub.unsubscribe();
            }
        })
    }, []);

    return (
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{error.title}</ModalHeader>
                    <ModalBody>
                        {error.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>{error.buttonLabel}</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
    );
}

interface ErrorObject {
    title: string
    message: string
    buttonLabel: string
}
