import {IReceptionMessage} from "./IReceptionMessage";
import {Navigator} from "@leftshiftone/convey";

export default class ReceptionMessage {

    public static get(): IReceptionMessage | undefined {
        const mandatorId = Navigator.getUrlParam("mandatorId");
        const customerId = Navigator.getUrlParam("customerId");
        const jobId = Navigator.getUrlParam("jobId");
        const jobCategory = Navigator.getUrlParam("jobCategory");
        const bearerId = Navigator.getUrlParam("bearerId")
        return new class implements IReceptionMessage {
            mandatorId: string | null = mandatorId;
            customerId: string | null = customerId;
            jobId: string | null = jobId;
            jobCategory: string | null = jobCategory;
            bearerId: string | null = bearerId;
            isMobile: boolean = false//isIE() || isMobile();
        }
    }
}
