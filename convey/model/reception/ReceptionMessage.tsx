import {Url} from "@utils/Url";
//import {Browser} from "../../../utils/Browser";
import {IReceptionMessage} from "./IReceptionMessage";

export default class ReceptionMessage {

    public static get(): IReceptionMessage | undefined {
        const mandatorId = Url.getParam("mandatorId");
        const customerId = Url.getParam("customerId");
        const jobId = Url.getParam("jobId");
        const jobCategory = Url.getParam("jobCategory");
        const bearerId = Url.getParam("bearerId")
        return new class implements IReceptionMessage {
            mandatorId: string | null = mandatorId;
            customerId: string | null = customerId;
            jobId: string | null = jobId;
            jobCategory: string | null = jobCategory;
            bearerId: string | null = bearerId;
            isMobile: boolean = false//Browser.isIE() || Browser.isMobile();
        }
    }
}
