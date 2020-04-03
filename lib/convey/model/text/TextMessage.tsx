const isContainerType = (str: string): boolean => str === "container" || str === "block";

export const unpack = (message: TextMessage): TextMessage[] => {
    return message.elements && isContainerType(message.type) ? message.elements : [message];
};

export interface TextMessage {
    parent?: TextMessage;
    elements?: TextMessage[];
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
