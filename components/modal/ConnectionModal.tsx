import React, {useEffect, useState} from 'react';

import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {ConnectionListener, ConnectionState} from "@convey/ConnectionListener";

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
                        title: "Verbindung verloren",
                        message: "Versuche Verbindung neu aufzubauen!",
                        buttonLabel: "Ok"
                    });
                    setModal(true);
                });
                return;
            case ConnectionState.DISCONNECTED:
                setError({
                    title: "Verbindung getrennt",
                    message: "Die Verbindung wurde getrennt",
                    buttonLabel: "Ok"
                });
                break;
            case ConnectionState.TIMEOUT:
                setError({
                    title: "Verbindung unterbrochen",
                    message: "Da hat wohl etwas zu lange gedauert...",
                    buttonLabel: "Ok"
                });
                break;
            case ConnectionState.BAD_CONNECTION:
                setError({
                    title: "Schlechte Internet Verbindung",
                    message: "Bitte überprüfen Sie Ihre Internet Verbindung",
                    buttonLabel: "Ok"
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
