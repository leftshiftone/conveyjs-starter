import React, {ReactElement} from "react";
import * as ReactDOM from "react-dom";

import {EmitterAware} from "@lib/emitter/Emitter";
import {CustomElement} from "@lib/convey/renderer/CustomElements";

import {TextMessage} from "@lib/convey/model/text/TextMessage";

import Template from "@components/custom/Template";

/**
 * Renders so-called 'custom-elements', meaning custom elements that are not part of the gaia-convey sdk but
 * required to fulfill the business requirements
 *
 * @author benjamin.krenn@leftshift.one
 * @since 0.1.0
 */
export class CustomRenderer {
    public static render(message: TextMessage) {
        if (!message) {
            return;
        }

        switch (message.class) {
            case CustomElement.TEMPLATE:
                CustomRenderer.doRender(message.class, <Template/>);
                break;
            default:
                break;
        }
    }

    private static doRender(triggerClass: string, component: ReactElement<EmitterAware>): void {
        const parent = document.querySelector(`.${triggerClass} `);
        if (!CustomRenderer.nullOrUndefined(parent)) {
            const placeHolder = document.createElement("div");
            parent!.insertBefore(placeHolder, parent!.firstChild);

            ReactDOM.render(component, placeHolder);
        } else {
            console.error(`could not find an element with the given class: ${triggerClass}`)
        }
    }

    private static nullOrUndefined(obj: any) {
        return obj === null || obj === undefined
    }
}
