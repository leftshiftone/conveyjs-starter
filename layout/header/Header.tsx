import React from "react";
import "./Header.css";
import {Nav, Navbar, NavbarBrand, NavItem, NavLink, Row} from "reactstrap";

const Header: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <div>
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
    );
};

interface Props {
    img       : string
    imgWidth  : string
    link      : string
    linkLabel : string
}

export default Header;
