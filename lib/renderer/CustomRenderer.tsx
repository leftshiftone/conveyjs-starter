import { ContentCentricRenderer } from "@leftshiftone/convey";

export default class CustomRenderer extends ContentCentricRenderer {
    public appendContent = (container: HTMLElement) => {
        if (!container)
            return;

        // Custom options for components
        /*if (container.querySelector(".")) {

        }*/

        this.content.appendChild(container);
    };
}
