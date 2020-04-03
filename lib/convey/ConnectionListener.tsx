import {Md5} from "ts-md5";

import {IListener, IPacket} from "@leftshiftone/convey";

import React from "react";
import {Subject} from 'rxjs';

export enum ConnectionState {
    CONNECTED,
    DISCONNECTED,
    CONNECTION_LOST,
    TIMEOUT,
    BAD_CONNECTION
}

export class ConnectionListener implements IListener {
    public static STATE: ConnectionState = ConnectionState.CONNECTED;
    public static MESSAGE_HASH: string = "";
    public static WAITING_FOR_MESSAGE_IN_MILLIS: number = 0;
    public static ConState = new Subject<ConnectionState>();

    private readonly waiting_for_message_timeout: number;

    constructor(waiting_for_message_timeout: number) {
        this.waiting_for_message_timeout = waiting_for_message_timeout || -1;

        ConnectionListener.updateConState(ConnectionState.CONNECTED);
    }

    private static updateConState(newState: ConnectionState) {
        this.ConState.next(newState);
    }

    public onConnected(): void {
        ConnectionListener.STATE = ConnectionState.CONNECTED;
        console.debug("ConnectionListener::Connected");

        ConnectionListener.updateConState(ConnectionState.CONNECTED);
    }

    public onDisconnected(): void {
        ConnectionListener.STATE = ConnectionState.DISCONNECTED;
        console.debug("ConnectionListener::Disconnected");

        ConnectionListener.updateConState(ConnectionState.DISCONNECTED);
    }

    public onError(error: string): void {
        console.debug("ConnectionListener::Error " + error);
    }

    public onMessage(data: any): void {
        console.debug("ConnectionListener::Message ", data);
        ConnectionListener.WAITING_FOR_MESSAGE_IN_MILLIS = 0;
    }

    public onPacketSend(packet: IPacket): void {
        console.debug("ConnectionListener::PacketSend ", packet);
        console.debug("State", ConnectionState[ConnectionListener.STATE]);

        const messageType = packet.cmd;
        console.debug("Received message type", messageType);

        if (messageType == "publish") {
            if (ConnectionListener.STATE === ConnectionState.CONNECTED) {
                const messageHash = Md5.hashStr(`${packet.topic}_${packet.payload}}`) as string;
                if (this.waiting_for_message_timeout >= 0) {
                    setTimeout(() => {
                        if (ConnectionListener.WAITING_FOR_MESSAGE_IN_MILLIS != 0 && ConnectionListener.MESSAGE_HASH == messageHash) {
                            ConnectionListener.updateConState(ConnectionState.TIMEOUT);
                        }
                    }, this.waiting_for_message_timeout);
                }
                ConnectionListener.MESSAGE_HASH = messageHash;
                ConnectionListener.WAITING_FOR_MESSAGE_IN_MILLIS = Date.now();
                return
            }

            ConnectionListener.updateConState(ConnectionState.BAD_CONNECTION);
        }
    }

    public onConnectionLost(): void {
        ConnectionListener.STATE = ConnectionState.CONNECTION_LOST;
        console.debug("ConnectionListener::ConnectionLost");

        ConnectionListener.updateConState(ConnectionState.CONNECTION_LOST);
    }
}
