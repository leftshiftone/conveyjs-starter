import React, {useEffect, useRef} from "react";

import "./InteractionContent.css";

import {EmitterAware} from "@lib//emitter/Emitter";
import {CONVEY_EVENT} from "@environment/Identifier";
import {TextMessage} from "@convey/model/text/TextMessage";

import {CustomRenderer} from '@lib//renderer/CustomRenderer';

/**
 * Renders the actual GAIA responses alias Conversational UI
 *
 * @author benjamin.krenn@leftshift.one
 * @author manuel.weixle@leftshift.one
 * @since 0.1.0
 */
export default function (props: EmitterAware) {
    const content = useRef(null);

    useEffect(() => {
        props.emitter.addListener(CONVEY_EVENT.ON_TEXT_MESSAGE, (textMessage: TextMessage) => {
            CustomRenderer.render(textMessage);
        });

        return function cleanup() {
            props.emitter.removeAllListeners(CONVEY_EVENT.ON_TEXT_MESSAGE);
            props.emitter.removeAllListeners(CONVEY_EVENT.ON_CONTEXT_MESSAGE);
        }
    }, []);

    return (
            <div className="lto-gaia">
                <div id="lto-content-wrapper" className="lto-content"/>
                <div ref={content} className="interaction-content"/>
                <div className="lto-suggest"/>

                <div style={{display: "none"}}>
                    <input type="text" className="lto-textbox"/>
                    <button className="lto-invoker"/>
                </div>
            </div>
    )
}
