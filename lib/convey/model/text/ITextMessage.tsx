const isContainerType = (str: string): boolean => str === "container" || str === "block";

export const unpack = (message: ITextMessage): ITextMessage[] => {
    return message.elements && isContainerType(message.type) ? message.elements : [message];
};

export class TextMessage {
    public static hasElement(message: ITextMessage, styleClass: string): boolean {
        console.log("ITextMessage", message, styleClass)
        if (message.class && message.class.includes(styleClass)) {
            return true;
        } else if (!message.elements) {
            return false;
        }

        let hasElement = false;
        for (let i = 0; i < message.elements.length; i++) {
            hasElement = hasElement || TextMessage.hasElement(message.elements[i], styleClass)
        }
        return hasElement;
    }
}

export interface ITextMessage {
    parent?: ITextMessage;
    elements?: ITextMessage[];
    id?: string;
    text?: string;
    class?: string;
    qualifier?: string;
    value: string;
    position: string;
    type: string;
    index: number;
    timestamp: number;
}
