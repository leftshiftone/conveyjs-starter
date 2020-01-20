const isContainerType = (str: string): boolean => str === "container" || str === "block";

export const unpack = (message: TextMessage): TextMessage[] => {
    return message.elements && isContainerType(message.type) ? message.elements : [message];
};

export interface TextMessage {
    elements?: TextMessage[];
    class?: string;
    qualifier?: string;
    index: number;
    timestamp: number;
    value: string;
    position: string;
    type: string;
}
