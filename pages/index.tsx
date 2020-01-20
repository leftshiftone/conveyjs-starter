import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { testStyle } from 'style/TestStyle';

import _JSXStyle from 'styled-jsx/style'

import ChatView from "@components/chat/ChatView";

import { EmitterContext } from "@lib/emitter/EmitterContext";

export default function() {
    return (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                  crossOrigin="anonymous"
            />

            <_JSXStyle>{ testStyle }</_JSXStyle>
            <EmitterContext.Consumer>
                {(emitter) => (<ChatView emitter={emitter}/>)}
            </EmitterContext.Consumer>
        </div>
    )
}
