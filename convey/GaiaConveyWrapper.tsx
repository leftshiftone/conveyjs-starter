import React from 'react';

import Emitter from "@lib/emitter/Emitter";
import Renderer from "@lib/renderer/Renderer";

import {
    GAIA_ACTIONS,
    GAIA_LISTENER
} from "@environment/Identifier";

import {
    ChannelType,
    Gaia,
    EventStream,
    MqttConnection,
    IListener
} from "@leftshiftone/convey";

import handlers from '@handler/Handlers';

class Listener implements IListener {
    private emitter = null as Emitter | null;

    onConnected(): void {
    }

    onDisconnected(): void {
        this.emitter!.emit(GAIA_LISTENER.DISCONNECTED)
    }

    onError(_error: string): void {
    }

    onMessage(_data: any): void {
    }

    setEmitter(emitter: Emitter) {
        this.emitter = emitter;
    }

    onConnectionLost(): void {
    }

    onPacketSend(): void {
    }
}

let listener = new Listener();

export class GaiaConveyWrapper {
    private readonly gaiaUrl: string;
    private readonly identityId: string;
    private readonly emitter: Emitter;
    private readonly timeoutMs: number;

    private static INSTANCE: GaiaConveyWrapper;

    private constructor(gaiaUrl: string, identityId: string, emitter: Emitter, timeoutMs: number) {
        this.gaiaUrl = gaiaUrl;
        this.identityId = identityId;
        this.emitter = emitter;
        this.timeoutMs = timeoutMs;

        this.emitter.addListener(GAIA_ACTIONS.PUBLISH, GaiaConveyWrapper.publish);
        this.emitter.addListener(GAIA_ACTIONS.CONNECT, (then: (error?: Error) => void) => {
            this.doConnect()
                .then(() => then())
                .catch(then)
        });
        this.emitter.addListener(GAIA_ACTIONS.CLEAR, () => document.querySelector('.lto-content')!.innerHTML = '');
    }

    public static init(gaiaUrl: string, identityId: string, emitter: Emitter, timeoutInMs = 5000): GaiaConveyWrapper {
        if (!this.INSTANCE) {
            this.INSTANCE = new this(gaiaUrl, identityId, emitter, timeoutInMs);
        }

        return this.INSTANCE;
    }

    public doConnect(): Promise<void> {
        return Promise.race([this.connect(), GaiaConveyWrapper.timeout(this.timeoutMs)]);
    }

    private connect(): Promise<void> {
        const renderer = new Renderer();
        renderer.scrollStrategy = "container";

        return new Promise((resolve): Promise<void> => new Gaia(renderer, listener)
            .connect(this.gaiaUrl, this.identityId)
            .then((connection: MqttConnection) => {
                connection.subscribe(ChannelType.TEXT, (data: object) => this.emitter.emit(GAIA_LISTENER.TEXT, data));
                connection.subscribe(ChannelType.CONTEXT, (data: object) => this.emitter.emit(GAIA_LISTENER.CONTEXT, data));

                connection.subscribe(ChannelType.NOTIFICATION, handlers.notification);

                connection.reception(GaiaConveyWrapper.getReceptionMessage());
                listener.setEmitter(this.emitter);

                this.emitter.addListener(GAIA_ACTIONS.DISCONNECT, () => connection.disconnect());

                resolve();
            }));
    }

    private static getReceptionMessage(): object | undefined {
        const issue = new URL(window.location.href).searchParams.get("issue-classification");
        return issue ? {issue} : undefined;
    }

    private static publish(result: any, additional: any): void {
        const container = Object.assign({result}, additional || {});
        EventStream.emit("GAIA::publish", {
            attributes: {
                type: "submit",
                value: JSON.stringify(container)
            },
            type: "submit"
        });
    }

    private static timeout(milliseconds: number): Promise<void> {
        return new Promise(((_, reject): void => {
            const wait = setTimeout((): void => {
                clearTimeout(wait);
                reject(new Error(`timed out after ${milliseconds} ms`));
            }, milliseconds);
        }));
    }
}
