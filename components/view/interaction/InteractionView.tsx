import React, {useEffect} from 'react';

import {Env, envWithDefaultOf, GaiaPort, GaiaUrl} from '@environment/Environment';

import {EmitterAware} from "@lib/emitter/Emitter";

import {IReceptionMessage} from "@lib/convey/model/reception/IReceptionMessage";
import ReceptionMessage from "@lib/convey/model/reception/ReceptionMessage";

import {ConveyWrapper} from "@lib/convey/ConveyWrapper";

import InteractionContent from "@components/view/interaction/InteractionContent";

import ConnectionModal from "@components/modal/ConnectionModal";

import {Navigator} from "@leftshiftone/convey";

import './InteractionView.scss';

export default function (props: EmitterAware) {
    let conveyWrapper: ConveyWrapper | null = null;

    useEffect(() => {
        const receptionMessage: IReceptionMessage | undefined = ReceptionMessage.get();
        if (!receptionMessage) return;

        fetch("/env.json")
                .then(value => value.json())
                .then(data => {
                    const url = data.gaia_url;
                    const port = data.gaia_port;
                    const identityId = data.gaia_identity_id;
                    const username = data.gaia_username;
                    const password = data.gaia_password;
                    const wait_timout = data.gaia_wait_timeout;
                    const environment = envWithDefaultOf(Navigator.getUrlParam("env") || data.gaia_env, Env.PROD);

                    connect(url, port, identityId, receptionMessage, environment, username, password, parseInt(wait_timout));
                }).catch(reason => {
            console.warn(`Unable to retrieve environment: ${reason}`);
            connect(GaiaUrl.LOCAL,
                    GaiaPort.LOCAL,
                    "",
                    receptionMessage, Env.DEV,
                    "",
                    "",
                    60000);
        });

        // clean-up on unmount
        return (() => {
            conveyWrapper && conveyWrapper.disconnect();
        })
    }, []);

    function connect(gaiaUrl: string,
                     gaiaPort: number,
                     gaiaIdentityId: string,
                     receptionMessage: IReceptionMessage,
                     environment: Env,
                     username: string | null = null,
                     password: string | null = null,
                     wait_timeout: number | null = null) {
        if (gaiaUrl && gaiaIdentityId) {
            conveyWrapper = ConveyWrapper.init(gaiaUrl, gaiaPort, gaiaIdentityId, username, password);
            conveyWrapper.connect(receptionMessage, environment, props.emitter, "channel1", wait_timeout || 60000);
        } else {
            console.error("Unable to connect to server")
        }
    }

    return (
            <div>
                <ConnectionModal/>
                <InteractionContent emitter={props.emitter}/>
            </div>
    )
}
