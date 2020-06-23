import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {testStyle} from 'style/TestStyle';

import _JSXStyle from 'styled-jsx/style'

import 'style/font.scss';
import 'style/lto.scss';
import 'style/app.scss';

import InteractionView from "@components/view/interaction/InteractionView";
import Layout from '@layout/Layout';

import {EmitterContext} from "@lib/emitter/EmitterContext";

export default function () {
    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Oswald|Roboto&display=swap" rel="stylesheet"/>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>

            <_JSXStyle>{testStyle}</_JSXStyle>
            <EmitterContext.Consumer>
                {(emitter) => (
                    <Layout
                        title={"conveyjs-starter"}
                        emitter={emitter}
                    >
                        <InteractionView emitter={emitter}/>
                        <div/>
                    </Layout>
                )}
            </EmitterContext.Consumer>
        </div>
    )
}
