import {ProgressConnector} from "@lib/shellConnector/ProgressConnector";

const notification = (payload: any, channelId = "") => {
    if(payload && payload[0]) {
        payload = payload[0]
        if (payload.max_progress) {
            ProgressConnector.setMaxProgress(payload.max_progress);
        } else if (payload.progress) {
            ProgressConnector.setProgress(payload.progress);
        }
    }

    console.debug(channelId, "Notification:", payload);
};

const logging = (payload: any, channelId = "") => {
    console.debug(channelId, "Logging:", payload);
};

const interaction = (payload: any, channelId = "") => {
    console.debug(channelId, "Interaction:", payload);
};

const context = (payload: any, channelId = "") => {
    console.debug(channelId, "Context:", payload);
};

export default {
    notification,
    logging,
    interaction,
    context
}
