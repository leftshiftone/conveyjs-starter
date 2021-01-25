import {QueueOptions} from "@leftshiftone/convey";

export interface IConveyOptions {
    url: string
    port: number
    identityId: string
    username: string | null
    password: string | null
}

export class ConveyOptions implements IConveyOptions {
    identityId: string;
    password: string | null;
    port: number;
    url: string;
    username: string | null;

    constructor(url: string, port: number, identityId: string, username: string | null = null, password: string | null = null) {
        this.url = url;
        this.port = port;
        this.identityId = identityId;
        this.username = username;
        this.password = password;
    }

    public getQueueOptions = () => new QueueOptions(this.url, this.port, this.username, this.password)

}