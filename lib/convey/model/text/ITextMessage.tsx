const isContainerType = (str: string): boolean => str === "container" || str === "block";

export const unpack = (message: ITextMessage): ITextMessage[] => {
    return message.elements && isContainerType(message.type) ? message.elements : [message];
};

export class TextMessage {
    public static hasElement(message: ITextMessage, styleClass: string): boolean {
        if (message.class && message.class.includes(styleClass)) {
            return true;
        } else if (!message.elements) {
            return false;
        }

        let hasElement = false;
        const elements: ITextMessage[] = message.elements;
        for (const element of elements) {
            hasElement = hasElement || TextMessage.hasElement(element, styleClass)
        }
        return hasElement;
    }

    public static findMessageWithClass(message: ITextMessage, styleClass: string): ITextMessage | null {
        if (!message.elements) {
            return null;
        }

        let found: ITextMessage | null = null;
        const elements: ITextMessage[] = message.elements;
        for (const element of elements) {
            if (element.class && element.class.includes(styleClass)) {
                return element;
            }
            found = this.findMessageWithClass(element, styleClass);
            if (found) {
                return found;
            }
        }
        return null;
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
