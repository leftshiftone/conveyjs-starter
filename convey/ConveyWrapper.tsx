import React from 'react';

import Emitter from "@lib/emitter/Emitter";
import Renderer from "@lib/renderer/Renderer";

import {ChannelType, EventStream, Gaia, Properties} from "@leftshiftone/convey";

import {Env} from '@environment/Environment';

import handlers from '@handler/Handlers';
import {disableLogging} from "@handler/Logging";

import {ConnectionListener} from "@convey/ConnectionListener";

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

    public connect(receptionMessage: object, environment: Env, emitter: Emitter, wait_timeout: number = 60000) {
        let renderer = new Renderer(emitter);
        renderer.scrollStrategy = "container";

        new Gaia(renderer, new ConnectionListener(wait_timeout)).connect(this.gaiaUrl, this.identityId, this.username, this.password)
                .then((connection: any) => {
                    if (environment == Env.DEV) {
                        connection.subscribe(ChannelType.CONTEXT, handlers.context);
                        connection.subscribe(ChannelType.LOG, handlers.log);
                    }
                    if (environment == Env.PROD) {
                        console.info("Logging is disabled");
                        disableLogging();
                    }
                    connection.subscribe(ChannelType.NOTIFICATION, handlers.notification);
                    connection.subscribe(ChannelType.TEXT, handlers.text);
                    connection.reception(receptionMessage);
                    this.connection = connection;
                })
    }

    public disconnect() {
        console.debug("Disconnecting");
        this.connection.disconnect()
    }
}
