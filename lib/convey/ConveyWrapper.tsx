import React from 'react';
import Emitter from "@lib/emitter/Emitter";
import Renderer from "@lib/convey/renderer/Renderer";
import {
    ConversationQueueType,
    EventStream,
    Gaia,
    MultiTargetRenderer,
    QueueHeader,
    QueueOptions
} from "@leftshiftone/convey";
import {Env} from '@environment/Environment';
import {disableLogging} from "@lib/convey/handler/LoggingHandler";
import {IReceptionMessage} from "@lib/convey/model/reception/IReceptionMessage";
import ChannelHandlers from "@lib/convey/handler/ChannelHandlers";

export class ConveyWrapper {
    private static INSTANCE: ConveyWrapper;
    private readonly url: string;
    private readonly port: number;
    private readonly identityId: string;
    private readonly username?: string | null;
    private readonly password?: string | null;
    private connection: any;

    private constructor(url: string, port: number, identityId: string, username: string | null = null, password: string | null = null) {
        this.url = url;
        this.port = port;
        this.identityId = identityId;
        this.username = username;
        this.password = password;
    }

    public static init(url: string, port: number, identityId: string, username: string | null = null, password: string | null = null): ConveyWrapper {
        if (username || password) {
            return this.INSTANCE || (this.INSTANCE = new ConveyWrapper(url, port, identityId, username, password))
        }
        return this.INSTANCE || (this.INSTANCE = new ConveyWrapper(url, port, identityId))
    }

    public static emit(method: string, obj: object) {
        EventStream.emit(method, obj)
    }

    public connect(receptionMessage: IReceptionMessage, environment: Env, emitter: Emitter, channelId, wait_timeout: number = 60000) {
        const renderer = new MultiTargetRenderer({
            [channelId]: new Renderer(emitter)
        })
        const header = new QueueHeader(this.identityId, channelId)

        let gaia = new Gaia(renderer);
        gaia.connect(new QueueOptions(this.url, this.port, this.username, this.password))
                .then(connection => {
                    const subscription = connection.subscribe(ConversationQueueType.INTERACTION, header, (payload) =>
                            payload && ChannelHandlers.interaction(payload, channelId));
                    connection.subscribe(ConversationQueueType.NOTIFICATION, header, (payload) =>
                        payload && ChannelHandlers.notification(payload[0], channelId));
                    if (environment == Env.DEV) {
                        connection.subscribe(ConversationQueueType.LOGGING, header, (payload) =>
                                payload && ChannelHandlers.logging(payload, channelId));
                        connection.subscribe(ConversationQueueType.CONTEXT, header, (payload) =>
                                payload && ChannelHandlers.context(payload, channelId));
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
