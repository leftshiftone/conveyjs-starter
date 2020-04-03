import {IReceptionMessage} from "./IReceptionMessage";
import {Navigator} from "@leftshiftone/convey";

export default class ReceptionMessage {

    public static get(): IReceptionMessage | undefined {
        const isMobile = Navigator.isMobile();
        return new class implements IReceptionMessage {
            isMobile: boolean = isMobile;
        }
    }
}
