import {TextMessage} from "@lib/convey/model/text/TextMessage";
import {CustomRenderer} from "@lib/convey/renderer/CustomRenderer";

import {ProgressConnector} from "@lib/shellConnector/ProgressConnector";

const notification = (message: any, channelId = "") => {
    console.debug(channelId, "Notification:");
    console.debug(message);

    if (message.max_progress) {
        ProgressConnector.setMaxProgress(message.max_progress);
    } else if (message.progress) {
        ProgressConnector.setProgress(message.progress);
    }
};

const log = (message: any, channelId = "") => {
    console.debug(channelId, "Log:");
    console.debug(message);
};

const text = (message: TextMessage) => {
    if (message.elements) {
        CustomRenderer.render(message);
    }

    console.debug("Text:");
    console.debug(message);
};

const interaction = (message: any, channelId = "") => {
    console.debug(channelId, "Interaction:");
    console.debug(message);
};

const context = (message: any, channelId = "") => {
    console.debug(channelId, "Context:");
    console.debug(message);
};

export default {
    notification,
    log,
    text,
    interaction,
    context
}
