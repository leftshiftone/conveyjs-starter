import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';

import {
    CONNECTION_STATE,
    GAIA_LISTENER,
    CONVEY_EVENT
} from "@environment/Identifier";

import { EnvironmentLoader } from "@environment/EnvironmentLoader";

import { EmitterAware } from "@lib/emitter/Emitter";

import {
    TextMessage,
    unpack
} from "@convey/model/text/TextMessage";
import { GaiaConveyWrapper } from "@convey/GaiaConveyWrapper";

import ChatContent from "@components/chat/ChatContent";

import {
    Spinner
} from '@bootstrap/all';

import './ChatView.css';

export default function(props : EmitterAware) {
    const [ connectionState, setConnectionState ] = useState(CONNECTION_STATE.CONNECTING);

    /**
     * Equivalent to componentDidMount
     */
    useEffect(() => {
        connect();

        props.emitter.addListener(GAIA_LISTENER.DISCONNECTED, () => {
            props.emitter.removeAllListeners(GAIA_LISTENER.TEXT);
            props.emitter.removeAllListeners(GAIA_LISTENER.CONTEXT);
            connect();
        });

        // DOCU: Add custom listeners (e.g. for navigation tabs)
    }, []);

    async function connect() {
        setConnectionState(CONNECTION_STATE.CONNECTING);

        props.emitter.addListener(GAIA_LISTENER.TEXT, (args : TextMessage) => {
            setLoaded(); // disable loading indicator after received message
            props.emitter.emit(CONVEY_EVENT.ON_TEXT_MESSAGE, unpack(args));
        });

        props.emitter.addListener(GAIA_LISTENER.CONTEXT, (args) => {
            props.emitter.emit(CONVEY_EVENT.ON_CONTEXT_MESSAGE, args);
        });

        const env = await EnvironmentLoader.instance().env();
        GaiaConveyWrapper.init(env.url, env.identityId, props.emitter)
            .doConnect()
            .catch((err: Error) => {
                console.error(`could not connect to gaia: ${err}`);
                setDisconnected();
        });
    }

    /**
     * Disable loading indicator
     */
    function setLoaded() {
        if (connectionState === CONNECTION_STATE.CONNECTING ||
            connectionState === CONNECTION_STATE.DISCONNECTED) {
            setConnectionState(CONNECTION_STATE.CONNECTED);
        }
    }

    /**
     * Sets the internal state to {@link CONNECTION_STATE#DISCONNECTED} if the connection
     * could not be established
     */
    function setDisconnected() {
        setConnectionState(CONNECTION_STATE.DISCONNECTED);
    }

    /**
     * Returns the content of the chat window depending on the {@link CONNECTION_STATE}
     */
    function renderConnectionState(): ReactNode {
        switch (connectionState) {
            case CONNECTION_STATE.CONNECTED:
                return <div/>;
            case CONNECTION_STATE.CONNECTING:
                return <Spinner/>;
            default :
                return (
                    <div className="disconnected-container">
                        <h1 className="disconnected-logo">
                            <i className="fas fa-dizzy"/>
                            oops
                        </h1>
                        <small>
                            could not connect to GAIA
                        </small>
                    </div>
                );
        }
    }

    return (
        <div>
            {renderConnectionState()}
            <ChatContent emitter={props.emitter}/>
        </div>
    )
}
