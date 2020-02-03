import React, {
    ReactNode,
    useEffect,
    useState
} from 'react';

import {
    Env,
    GaiaUrl,
    envWithDefaultOf
} from '@environment/Environment';

import { EmitterAware } from "@lib/emitter/Emitter";

import { GaiaConveyWrapper } from "@convey/GaiaConveyWrapper";
import { IReceptionMessage } from "@convey/model/reception/IReceptionMessage";
import ReceptionMessage from "@convey/model/reception/ReceptionMessage";

import ChatContent from "@components/chat/ChatContent";

import { Spinner } from '@bootstrap/all';

import { Url } from "@utils/Url";

import './ChatView.css';

import {
    ConnectionListener,
    ConnectionState
} from "@convey/ConnectionListener";

export default function(props: EmitterAware) {
    const [ connectionState, setConnectionState ] = useState(ConnectionState.DISCONNECTED);
    let conveyWrapper : GaiaConveyWrapper | null = null;

    useEffect(() => {
        const receptionMessage: IReceptionMessage | undefined = ReceptionMessage.get();
        if (!receptionMessage) return;

        fetch("/env.json")
            .then(value => value.json())
            .then(data => {
                const url = data.gaia_url;
                const identityId = data.gaia_identity_id;
                const username = data.gaia_username;
                const password = data.gaia_password;
                const wait_timout = data.gaia_wait_timeout;
                const environment = envWithDefaultOf(Url.getParam("env") || data.gaia_env, Env.PROD);

                connect(url, identityId, receptionMessage, environment, username, password, parseInt(wait_timout)/*, properties*/);
            }).catch(reason => {
            console.warn(`Unable to retrieve environment: ${reason}`);
            connect(GaiaUrl.BETA,
                "d2a0cc18-8e97-4e87-9c4f-c1b3190844fc",
                receptionMessage, Env.DEV,
                null,
                null,
                60000/*,
                properties*/);
        });

        return(() => {
            conveyWrapper && conveyWrapper.disconnect();
        })
    }, []);

    useEffect(() => {
        setLoadingState(ConnectionListener.STATE);
    },[ConnectionListener.STATE]);

    function connect(gaiaUrl: string,
                    gaiaIdentityId: string,
                    receptionPayload: object,
                    environment: Env,
                    username: string | null = null,
                    password: string | null = null,
                    wait_timeout: number | null = null,
                    /*properties: ConveyProperties*/) {

        conveyWrapper = GaiaConveyWrapper.init(gaiaUrl, gaiaIdentityId, username, password);
        conveyWrapper.connect(receptionPayload, environment, props.emitter, wait_timeout || 60000/*, properties*/);
    }

    function setLoadingState(state : number) {
        setConnectionState(state);
    }

    /**
     * Returns the content of the chat window depending on the {@link ConnectionState}
     */
    function renderConnectionState(): ReactNode {
        switch (connectionState) {
            case ConnectionState.CONNECTED:
                return <div/>;
            case ConnectionState.DISCONNECTED:
                return <Spinner/>;
            default:
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
