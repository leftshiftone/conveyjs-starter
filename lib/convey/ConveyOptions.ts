import {QueueOptions} from "@leftshiftone/convey";

export interface IConveyOptions {
    url: string
    port: number
    identityId: string
    username: string
    password: string
}

export class ConveyOptions implements IConveyOptions {
    identityId: string;
    password: string;
    port: number;
    url: string;
    username: string;

    constructor(url: string, port: number, identityId: string, username: string, password: string) {
        this.url = url;
        this.port = port;
        this.identityId = identityId;
        this.username = username;
        this.password = password;
    }

    public getQueueOptions = () => new QueueOptions(this.url, this.port, this.username, this.password)

}