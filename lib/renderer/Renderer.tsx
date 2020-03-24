import {ContentCentricRenderer} from "@leftshiftone/convey";
import Emitter from "@lib/emitter/Emitter";

import {LoadingConnector} from "@lib/shellConnector/LoadingIndicator";

export default class Renderer extends ContentCentricRenderer {
    private emitter: Emitter;
    private loading = false;

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
            LoadingConnector.setVisibility(true);
        } else if (this.loading && botResponse.length > 0) {
            this.loading = false;
            LoadingConnector.setVisibility(false);
        }
    }
}
