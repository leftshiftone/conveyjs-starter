import {ContentCentricRenderer} from "@leftshiftone/convey";
import Emitter from "@lib/emitter/Emitter";

import {LoadingIndicator} from "@bootstrap/LoadingIndicator";

export default class Renderer extends ContentCentricRenderer {
    private emitter: Emitter;
    private loading = false;

    private readonly loadingIndicator = LoadingIndicator();

    public constructor(emitter: Emitter) {
        super();
        this.emitter = emitter
    }

    public appendContent = (container: HTMLElement) => {
        if (!container)
            return;

        // Custom options for components
        /*if (container.querySelector(".")) {

        }*/

        this.content.appendChild(container);
        this.checkCommunicationState(container);
    };

    private checkCommunicationState(container: HTMLElement) {
        let userInput = container.getElementsByClassName("lto-right");
        let botResponse = container.getElementsByClassName("lto-left");
        if (userInput.length > 0 && !this.loading) {
            this.loading = true;
            this.content.appendChild(this.loadingIndicator);

        } else if (this.loading && botResponse.length > 0) {
            this.loading = false;
            this.content.removeChild(this.loadingIndicator);
        }
    }
}
