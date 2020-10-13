import {TextMessage} from "@lib/convey/model/text/TextMessage";
import {CustomRenderer} from "@lib/convey/renderer/CustomRenderer";

import {ProgressConnector} from "@lib/shellConnector/ProgressConnector";

const notification = (message: any, channelId = "") => {
    console.debug(channelId, "Notification:", message);

    if (message.max_progress) {
        ProgressConnector.setMaxProgress(message.max_progress);
    } else if (message.progress) {
        ProgressConnector.setProgress(message.progress);
    }
};

const logging = (message: any, channelId = "") => {
    console.debug(channelId, "Logging:", message);
};

const interaction = (message: any, channelId = "") => {
    if (message.elements) {
        CustomRenderer.render(message);
    }
    console.debug(channelId, "Interaction:", message);
};

const context = (message: any, channelId = "") => {
    console.debug(channelId, "Context:", message);
};

export default {
    notification,
    logging,
    interaction,
    context
}
