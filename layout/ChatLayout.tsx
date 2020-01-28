import React, {
    ReactNodeArray,
    useState
} from 'react';
import Head from "next/head";

import {
    Col,
    Row,
    Container
} from "reactstrap";

import Footer from './footer/Footer';
import Header from './header/Header';
import Login from './Login';

import "./ChatLayout.css"

export default function(props: IProps) {
    const [ loggedIn, setLoggedIn ] = useState(false);

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
                {loggedIn ? (
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
                    <Login updateLogin={(value) => setLoggedIn(value)}/>
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
}
