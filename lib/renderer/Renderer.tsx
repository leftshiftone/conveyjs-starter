import { ContentCentricRenderer } from "@leftshiftone/convey";
import Emitter from "@lib/emitter/Emitter";

export default class Renderer extends ContentCentricRenderer {
    private emitter: Emitter;

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
    };
}
