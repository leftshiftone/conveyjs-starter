import React from 'react';

import Emitter from "@lib/emitter/Emitter";
import Renderer from "@lib/convey/renderer/Renderer";

import {
    ChannelType,
    ConversationQueueType,
    EventStream,
    Gaia,
    MultiTargetRenderer,
    QueueHeader,
    QueueOptions
} from "@leftshiftone/convey";

import {Env} from '@environment/Environment';

import channelHandlers from '@lib/convey/handler/ChannelHandlers';
import {disableLogging} from "@lib/convey/handler/LoggingHandler";

import {ConnectionListener} from "@lib/convey/ConnectionListener";
import {IReceptionMessage} from "@lib/convey/model/reception/IReceptionMessage";

export class ConveyWrapper {
    private static INSTANCE: ConveyWrapper;
    private readonly gaiaUrl: string;
    private readonly identityId: string;
    private readonly username?: string | null;
    private readonly password?: string | null;
    private connection: any;

    private constructor(gaiaUrl: string, identityId: string, username: string | null = null, password: string | null = null) {
        this.gaiaUrl = gaiaUrl;
        this.identityId = identityId;
        this.username = username;
        this.password = password;
    }

    public static init(gaiaUrl: string, identityId: string, username: string | null = null, password: string | null = null): ConveyWrapper {
        if (username || password) {
            return this.INSTANCE || (this.INSTANCE = new ConveyWrapper(gaiaUrl, identityId, username, password))
        }
        return this.INSTANCE || (this.INSTANCE = new ConveyWrapper(gaiaUrl, identityId))
    }

    public static emit(method: string, obj: object) {
        EventStream.emit(method, obj)
    }

    public connect(receptionMessage: IReceptionMessage, environment: Env, emitter: Emitter, wait_timeout: number = 60000) {
        const header = new QueueHeader(this.identityId, "channel1")
        const renderer = new MultiTargetRenderer({
            "channel1": new Renderer(emitter)
        })

        let gaia = new Gaia(renderer);
        gaia.connect(new QueueOptions(this.gaiaUrl, 61616, this.username, this.password))
                .then(connection => {
                    const subscription = connection.subscribe(ConversationQueueType.INTERACTION, header, (payload) => console.log(`1 interaction:`, payload));
                    connection.subscribe(ConversationQueueType.NOTIFICATION, header, (payload) => console.log('1 Notification:', payload));
                    if (environment == Env.DEV) {
                        connection.subscribe(ConversationQueueType.LOGGING, header, (payload) => console.log('1 Log:', payload))
                        connection.subscribe(ConversationQueueType.CONTEXT, header, (payload) => console.log('1 context:', payload))
                    }
                    if (environment == Env.PROD) {
                        console.info("Logging is disabled");
                        disableLogging();
                    }
                    subscription.reception(receptionMessage);
                    this.connection = connection;
                });
    }

    public disconnect() {
        console.debug("Disconnecting");
        this.connection.disconnect()
    }
}
