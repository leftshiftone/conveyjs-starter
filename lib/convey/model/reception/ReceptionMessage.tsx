import {IReceptionMessage} from "./IReceptionMessage";
import {Navigator} from "@leftshiftone/convey";

export default class ReceptionMessage {

    public static get(): IReceptionMessage | undefined {
        const message = Navigator.getUrlParam("message");
        return new class implements IReceptionMessage {
            message: string | null = message;
        }
    }
}
