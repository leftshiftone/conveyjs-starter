import React, {ReactNodeArray, useEffect, useState} from 'react';
import Head from "next/head";

import {Col, Container, Row} from "reactstrap";

import Emitter from '@lib/emitter/Emitter';

import Footer from './footer/Footer';
import Header from './header/Header';
import Login from '@components/view/login/LoginView';

import "./Layout.css"

export default function (props: IProps) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isIE, setIsIE] = useState(true);

    useEffect(() => {
        let ie = window.navigator.userAgent.indexOf('Trident') != -1;
        if (!ie) {
            setIsIE(false);
        } else {
            alert("Please use a modern browser!");
        }
    }, []);

    return (
            <div>
                <Head>
                    <title>{props.title}</title>
                </Head>
                <Header
                    img={"/static/lso_mini.png"}
                    imgWidth={"55px"}
                    link={"https://github.com/leftshiftone/conveyjs-starter"}
                    linkLabel={"conveyjs starter"}
                />
                <Container>
                    {!isIE && (
                            loggedIn ? (
                                    <Row>
                                        <Col lg={2}>
                                        </Col>
                                        <Col lg={8} className={"lto-content-container mt-4"}>
                                            {props.children[0] || <div/>}
                                        </Col>
                                        <Col lg={2}>
                                        </Col>
                                    </Row>
                            ) : (
                                    <Login
                                            updateLogin={(value) => setLoggedIn(value)}
                                            emitter={props.emitter}
                                    />
                            )
                    )}
                    <Row>
                        <Footer>
                            <div>
                                <img src="/static/lso_mini.png" width="25px" className="conveyjs-starter-logo"/>
                                <small>leftshift.one Software GmbH - BETA</small>
                            </div>
                        </Footer>
                    </Row>
                </Container>
            </div>
    )
}

interface IProps {
    title: string
    children: ReactNodeArray
    emitter: Emitter
}
