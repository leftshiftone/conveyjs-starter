import React from "react";
import "./Header.css";

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
    );
};

interface Props {
    img: string
    imgWidth: string
    link: string
    linkLabel: string
}

export default Header;
