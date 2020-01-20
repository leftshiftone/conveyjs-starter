import React, { useEffect } from 'react';

import { EmitterAware } from "@lib/emitter/Emitter";

import {
    GAIA_ACTIONS,
    GAIA_LISTENER
} from "@environment/Identifier";

export default function(props : EmitterAware) {
    // equivalent to componentDidMount
    useEffect(() => {
        connect();

        props.emitter.addListener(GAIA_LISTENER.DISCONNECTED, () => {
            props.emitter.removeAllListeners(GAIA_LISTENER.TEXT);
            props.emitter.removeAllListeners(GAIA_LISTENER.CONTEXT);
            connect();
        });

        // DOCU: Add custom listeners (e.g. for navigation tabs)
    }, []);

    function connect() {

    }
}
