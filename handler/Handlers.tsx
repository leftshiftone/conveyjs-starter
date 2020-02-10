import {TextMessage} from "@convey/model/text/TextMessage";
import {CustomRenderer} from "@lib/renderer/CustomRenderer";

const notification = (message: any) => {
    console.debug("Notification:");
    console.debug(message);
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
