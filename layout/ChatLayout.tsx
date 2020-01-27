import React, {ReactNodeArray} from 'react';
import Head from "next/head";

import {Col, Container, Nav, Navbar, NavbarBrand, NavItem, NavLink, Row} from "reactstrap";
import Footer from './footer/Footer';

import "./ChatLayout.css"

export default function(props : IProps) {
    return (
        <div>
            {/*
            <Head>
                <title>{this.props.title}</title>
            </Head>
            */}
            <div>
                <Row>
                    <Navbar color="light" light expand="lg">
                        <NavbarBrand href="/"><img src="/static/lso_mini.png" width="55px"/></NavbarBrand>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/leftshiftone/conveyjs-starter">
                                    conveyjs starter
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Row>
            </div>
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
