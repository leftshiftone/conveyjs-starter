import {Md5} from "ts-md5";

import {
    IListener,
    IPacket
} from "@leftshiftone/convey";

import React from "react";

export enum ConnectionState {
    CONNECTED,
    DISCONNECTED,
    CONNECTION_LOST
}

export class ConnectionListener implements IListener {
    public static STATE: ConnectionState = ConnectionState.CONNECTED;
    public static MESSAGE_HASH: string = "";
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

        const messageType = packet.cmd;
        console.debug("Received message type", messageType);

        if (messageType == "publish") {
            const content = document.getElementsByClassName("lto-content").item(0)!;
            if (ConnectionListener.STATE === ConnectionState.CONNECTED) {
                const messageHash = Md5.hashStr(`${packet.topic}_${packet.payload}}`) as string;
                if (this.waiting_for_message_timeout >= 0) {
                    setTimeout(() => {
                        if (ConnectionListener.WAITING_FOR_MESSAGE_IN_MILLIS != 0 && ConnectionListener.MESSAGE_HASH == messageHash) {
                            ConnectionListener.showErrorOverlay(window, document, location, content, "OOPS, DAS HAT WOHL ETWAS ZU LANGE GEDAUERT!", "timeout");
                        }
                    }, this.waiting_for_message_timeout);
                }
                ConnectionListener.MESSAGE_HASH = messageHash;
                ConnectionListener.WAITING_FOR_MESSAGE_IN_MILLIS = Date.now();
                return
            }

            ConnectionListener.showErrorOverlay(window, document, location, content, "SCHLECHTE INTERNET VERBINDUNG?", "connection");
        }
    }

    public onConnectionLost(): void {
        ConnectionListener.STATE = ConnectionState.CONNECTION_LOST;
        console.debug("ConnectionListener::ConnectionLost");
    }

    static showErrorOverlay(window: Window,
                            document: Document,
                            location: Location,
                            content: Element,
                            message: string,
                            errorType: "connection" | "timeout" | "general") {
        const block = document.createElement("div");
        block.classList.add("lto-block", "error");

        const errorContainer = document.createElement("div");
        errorContainer.classList.add("lto-error-container");

        const overlays = document.createElement("div");
        overlays.classList.add("lto-overlays");
        const overlay = document.createElement("div");
        overlay.classList.add("lto-overlay");

        const closeButton = document.createElement("div");
        closeButton.className = "lto-close-overlay";
        overlay.appendChild(closeButton);

        closeButton.addEventListener("click", () => {
            if(block.parentElement && block.parentElement.classList.contains("lto-container")) {
                block.parentElement.remove();
            } else {
                block.remove();
            }
        }, {once: true});

        const errorImg = document.createElement("div");
        errorImg.classList.add(`lto-${errorType}-error`);

        const text = document.createElement("div");
        text.classList.add("lto-text");
        const buttonDiv = document.createElement("div");
        const button = document.createElement("button");
        button.classList.add("lto-button");

        text.textContent = message;

        button.innerText = "SEITE NEU LADEN";
        button.onclick = () => location.reload();

        errorContainer.append(errorImg);
        errorContainer.append(text);
        buttonDiv.append(button);
        errorContainer.append(buttonDiv);
        overlay.append(errorContainer);
        overlay.append(closeButton);
        overlays.append(overlay);
        block.append(overlays);
        content.append(block);

        window.onbeforeunload = () => {
        };
    }
}
