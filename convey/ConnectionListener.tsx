import {
    IListener,
    IPacket
} from "@leftshiftone/convey";

export enum ConnectionState {
    CONNECTED,
    DISCONNECTED,
    CONNECTION_LOST
}

export class ConnectionListener implements IListener {
    public static STATE: ConnectionState = ConnectionState.CONNECTED;
    public static WAITING_FOR_MESSAGE_IN_MILLIS: number = 0;

    private readonly waiting_for_message_timeout: number;

    constructor(waiting_for_message_timeout: number) {
        this.waiting_for_message_timeout = waiting_for_message_timeout || -1;
    }

    public onConnected(): void {
        ConnectionListener.STATE = ConnectionState.CONNECTED;
        console.debug("ConnectionListener::Connected");
    }

    public onDisconnected(): void {
        ConnectionListener.STATE = ConnectionState.DISCONNECTED;
        console.debug("ConnectionListener::Disconnected");
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
    }

    public onConnectionLost(): void {
        ConnectionListener.STATE = ConnectionState.CONNECTION_LOST;
        console.debug("ConnectionListener::ConnectionLost");
    }

}
