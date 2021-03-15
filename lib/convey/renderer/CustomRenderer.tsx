import React, {ReactElement} from "react";
import * as ReactDOM from "react-dom";

import {EmitterAware} from "@lib/emitter/Emitter";
import {CustomElement} from "@lib/convey/renderer/CustomElements";

import {ITextMessage, TextMessage} from "@lib/convey/model/text/ITextMessage";

import Template from "@components/custom/Template";
import OtherTemplateComponent from "@components/custom/OtherTemplateComponent";

/**
 * Renders so-called 'custom-elements', meaning custom elements that are not part of the gaia-convey sdk but
 * required to fulfill the business requirements
 *
 * @author benjamin.krenn@leftshift.one
 * @since 0.1.0
 */
export class CustomRenderer {
    public static render(message: ITextMessage): void {
        if (!message) {
            return;
        }

        let element: ITextMessage;
        if (TextMessage.hasElement(message, CustomElement.TEMPLATE)) {
            CustomRenderer.doRender(CustomElement.TEMPLATE, <Template/>);
        } else if ((element = TextMessage.findMessageWithClass(message, CustomElement.OTHER_ELEMENT_WITH_VALUE_NEEDED))) {
            CustomRenderer.doRender(CustomElement.OTHER_ELEMENT_WITH_VALUE_NEEDED, <OtherTemplateComponent value={element.value}/>);
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
