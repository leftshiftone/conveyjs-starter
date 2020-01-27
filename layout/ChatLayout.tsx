import React, {ReactNodeArray} from 'react';
import Head from "next/head";

import {
    Col,
    Row,
    Container
} from "reactstrap";

import Footer from './footer/Footer';
import Header from './header/Header';

import "./ChatLayout.css"

export default function(props : IProps) {
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
                <Row>
                    <Col lg={2}>
                    </Col>
                    <Col lg={8}>
                        {props.children[0] || <div/>}
                    </Col>
                    <Col lg={2}>
                    </Col>
                </Row>
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
    title    : string
    children : ReactNodeArray
}
