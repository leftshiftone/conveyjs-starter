import {TextMessage} from "@lib/convey/model/text/TextMessage";
import {CustomRenderer} from "@lib/convey/renderer/CustomRenderer";

import {ProgressConnector} from "@lib/shellConnector/ProgressConnector";

const notification = (message: any) => {
    console.debug("Notification:");
    console.debug(message);

    if (message.max_progress) {
        ProgressConnector.setMaxProgress(message.max_progress);
    } else if (message.progress) {
        ProgressConnector.setProgress(message.progress);
    }
};

const log = (message: any) => {
    console.debug("Log:");
    console.debug(message);
};

const text = (message: TextMessage) => {
    if (message.elements) {
        CustomRenderer.render(message);
    }

    console.debug("Text:");
    console.debug(message);
};

const context = (message: any) => {
    console.debug("Context:");
    console.debug(message);
};

export default {
    notification,
    log,
    text,
    context
}
