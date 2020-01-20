import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';

import {
    EmitterAware
} from "@lib/emitter/Emitter";

import {
    CONNECTION_STATE,
    GAIA_LISTENER,
    CONVEY_EVENT
} from "@environment/Identifier";

import {
    EnvironmentLoader
} from "@environment/EnvironmentLoader";

import {
    TextMessage,
    unpack
} from "@convey/model/text/TextMessage";

import {
    GaiaConveyWrapper
} from "@convey/GaiaConveyWrapper";

import './ChatView.css';

export default function(props : EmitterAware) {
    const [ connectionState, setConnectionState ] = useState(CONNECTION_STATE.CONNECTING);

    /**
     * Equivalent to componentDidMount
     */
    useEffect(() => (async () => {
        await connect();

        props.emitter.addListener(GAIA_LISTENER.DISCONNECTED, () => {
            props.emitter.removeAllListeners(GAIA_LISTENER.TEXT);
            props.emitter.removeAllListeners(GAIA_LISTENER.CONTEXT);
            connect();
        });

        // DOCU: Add custom listeners (e.g. for navigation tabs)
    }), []);

    async function connect() {
        setConnectionState(CONNECTION_STATE.CONNECTING);

        props.emitter.addListener(GAIA_LISTENER.TEXT, (args : TextMessage) => {
            setLoaded(); // disable loading indicator after received message
            props.emitter.emit(CONVEY_EVENT.ON_TEXT_MESSAGE, args);
        });

        props.emitter.addListener(GAIA_LISTENER.CONTEXT, (args) => {
            props.emitter.emit(CONVEY_EVENT.ON_CONTEXT_MESSAGE, args);
        });

        const env = await EnvironmentLoader.instance().env();
        GaiaConveyWrapper.init(env.url, env.identityId, this.props.emitter)
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
        if (connectionState === (CONNECTION_STATE.CONNECTING | CONNECTION_STATE.DISCONNECTED)) {
            setConnectionState(CONNECTION_STATE.CONNECTED);
        }
    }

    /**
     * Sets the internal state to {@link CONNECTION_STATE#DISCONNECTED} if the connection
     * could not be established
     */
    function setDisconnected() {
        this.setState({connectionState: CONNECTION_STATE.DISCONNECTED});
    }

    /**
     * Returns the content of the chat window depending on the {@link CONNECTION_STATE}
     */
    function renderChatWindowContent(): ReactNode {
        switch (this.state.connectionState) {
            case CONNECTION_STATE.CONNECTED:
                return <div/>;
            case CONNECTION_STATE.CONNECTING:
                return (
                    <div className="spinner-container">
                        {/*<Spinner color="secondary" type="grow"/>*/}
                        Spinner
                    </div>
                );
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
            Chat Window :D
        </div>
    )
}
