import React from "react";
import "./Header.css";

import {
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row
} from "reactstrap";

const Header: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src={props.img} width={props.imgWidth}/>
            </a>
            <a href={props.link} className={"float-right"}>
                {props.linkLabel}
            </a>
        </nav>
        /*
        <div className={"lto-header-container"}>
            <Row>
                <Navbar color="light" light expand="lg">
                    <NavbarBrand href="/"><img src={props.img} width={props.imgWidth}/></NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href={props.link}>
                                {props.linkLabel}
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </Row>
        </div>
         */
    );
};

interface Props {
    img       : string
    imgWidth  : string
    link      : string
    linkLabel : string
}

export default Header;
