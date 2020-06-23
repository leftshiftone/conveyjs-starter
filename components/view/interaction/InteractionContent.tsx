import React, {
    useState,
    useEffect,
    useRef
} from "react";

import "./InteractionContent.scss";

import {EmitterAware} from "@lib//emitter/Emitter";
import {CONVEY_EVENT} from "@environment/Identifier";
import {TextMessage} from "@lib/convey/model/text/TextMessage";

import {CustomRenderer} from '@lib//convey/renderer/CustomRenderer';

import {InputConnector} from '@lib/shellConnector/Input';
import {LoadingConnector} from '@lib/shellConnector/LoadingIndicator';

import {LoadingIndicator} from "@components/common/LoadingIndicator";

/**
 * Renders the actual GAIA responses alias Conversational UI
 *
 * @author benjamin.krenn@leftshift.one
 * @author manuel.weixle@leftshift.one
 * @since 0.1.0
 */
export default function (props: EmitterAware) {
    const content = useRef(null);
    const [ inputVisible, setInputVisible ] = useState<string>('none');
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        props.emitter.addListener(CONVEY_EVENT.ON_TEXT_MESSAGE, (textMessage: TextMessage) => {
            CustomRenderer.render(textMessage);
        });

        let inputCon = InputConnector.Visible.asObservable();
        const inputSub = inputCon.subscribe(data => {
            setInputVisible(data);
        });

        let loadingCon = LoadingConnector.Visible.asObservable();
        const loadingSub = loadingCon.subscribe(data => {
            setLoading(data);
        });

        return function cleanup() {
            props.emitter.removeAllListeners(CONVEY_EVENT.ON_TEXT_MESSAGE);
            props.emitter.removeAllListeners(CONVEY_EVENT.ON_CONTEXT_MESSAGE);
            inputSub.unsubscribe();
            loadingSub.unsubscribe();
        }
    }, []);

    return (
        <div className="lto-gaia">
            <div id="lto-content-wrapper" className="lto-content"/>
            {loading && <LoadingIndicator/>}
            <div ref={content} className="interaction-content"/>
            <div className="lto-suggest"/>

            <div className="fixed-bottom mx-auto mb-5 col-sm-8 col-md-8 col-lg-8 col-xl-8 text-center"
                 style={{display : inputVisible}}>
                <div className="input-group">
                    <input type="text" className="form-control lto-textbox" placeholder="Eingabe..."
                           aria-label="Chat Eingabe" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button className="lto-invoker btn btn-success" type="button">Senden</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
