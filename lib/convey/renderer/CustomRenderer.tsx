import React, {ReactElement, ReactNode} from "react";
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
    public static render(container: HTMLElement): void {
        if (!container) {
            return;
        }

        let selection: HTMLElement;
        if ((selection = container.querySelector(CustomElement.TEMPLATE))) {
            this.doReplace(selection, <Template/>)
        }
        if ((selection = container.querySelector(CustomElement.OTHER_ELEMENT_WITH_PROPS))) {
            this.doReplace(selection, <OtherTemplateComponent value={selection.innerText}/>)
        }
    }

    private static doReplace(selection: HTMLElement, component: ReactNode): void {
        const placeHolder = document.createElement("div");
        ReactDOM.render(component, placeHolder);
        if (placeHolder.children.length) {
            selection.replaceWith(placeHolder.children[0]);
        }
    }
}
