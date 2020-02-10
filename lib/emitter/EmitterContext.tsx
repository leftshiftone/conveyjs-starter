import * as React from "react";

import Emitter from "./Emitter";

export const actualEmitter = new Emitter();
export const EmitterContext = React.createContext(actualEmitter);

export function withEmitter(Component: any) {
    return function EmitterComponent(props: any) {
        return (
                <EmitterContext.Consumer>
                    {emitter => <Component {...props} emitter={emitter}/>}
                </EmitterContext.Consumer>
        );
    };
}
