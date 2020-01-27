import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { testStyle } from 'style/TestStyle';

import _JSXStyle from 'styled-jsx/style'

import ChatView from "@components/chat/ChatView";
import Layout from '@layout/ChatLayout';

import { EmitterContext } from "@lib/emitter/EmitterContext";

export default function() {
    return (

        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                  crossOrigin="anonymous"
            />
            <link href="https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap" rel="stylesheet" />

            <_JSXStyle>{ testStyle }</_JSXStyle>
            <Layout title={"conveyjs-starter"}>
                <EmitterContext.Consumer>
                    {(emitter) => (<ChatView emitter={emitter}/>)}
                </EmitterContext.Consumer>
                <EmitterContext.Consumer>
                    {(_) => <div/>}
                </EmitterContext.Consumer>
            </Layout>
        </div>
        /*
        <Layout title={"conveyjs-starter"}>
            <EmitterContext.Consumer>
                {(emitter) => (<ChatView emitter={emitter}/>)}
            </EmitterContext.Consumer>
            <EmitterContext.Consumer>
                {(_) => <div/>}
            </EmitterContext.Consumer>
        </Layout>*/
    )
}
