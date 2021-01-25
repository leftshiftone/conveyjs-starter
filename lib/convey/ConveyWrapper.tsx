import React from 'react';
import Emitter from "@lib/emitter/Emitter";
import Renderer from "@lib/convey/renderer/Renderer";
import {Gaia, QueueHeader} from "@leftshiftone/convey";
import {Env} from '@environment/Environment';
import {disableLogging} from "@lib/convey/handler/LoggingHandler";
import {IReceptionMessage} from "@lib/convey/model/reception/IReceptionMessage";
import QueueHandlers from "@lib/convey/handler/QueueHandlers";
import {ConveyOptions} from "@lib/convey/ConveyOptions";

export class ConveyWrapper {
    private static INSTANCE: ConveyWrapper;
    private readonly options: ConveyOptions;
    private connection: any;

    private constructor(options: ConveyOptions) {
        this.options = options
    }

    public static init(options: ConveyOptions): ConveyWrapper {
        return this.INSTANCE || (this.INSTANCE = new ConveyWrapper(options))
    }

    public connect(receptionMessage: IReceptionMessage, environment: Env, emitter: Emitter, wait_timeout: number = 60000) {
        const header = new QueueHeader(this.options.identityId)
        const renderer = new Renderer(emitter);

        new Gaia().connect(this.options.getQueueOptions()).then(connection => {
            connection.subscribeInteraction(header, payload => QueueHandlers.interaction(payload, header.channelId), renderer)
                    .reception(receptionMessage);
            connection.subscribeNotification(header, payload => QueueHandlers.notification(payload, header.channelId));
            if (environment == Env.DEV) {
                connection.subscribeLogging(header, payload => QueueHandlers.logging(payload, header.channelId));
                connection.subscribeContext(header, payload => QueueHandlers.context(payload, header.channelId));
            }
            if (environment == Env.PROD) {
                console.info("Logging is disabled");
                disableLogging();
            }
            this.connection = connection;
        });
    }

    public disconnect() {
        console.debug("Disconnecting");
        this.connection.disconnect()
    }
}
