import React from 'react';

import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { testStyle } from 'style/TestStyle';

import _JSXStyle from 'styled-jsx/style'

import ChatView from "@components/chat/ChatView";

import { EmitterContext } from "@lib/emitter/EmitterContext";

export default function() {
    return (
        <div>
            <_JSXStyle>{ testStyle }</_JSXStyle>
            <EmitterContext.Consumer>
                {(emitter) => (<ChatView emitter={emitter}/>)}
            </EmitterContext.Consumer>
        </div>
    )
}
