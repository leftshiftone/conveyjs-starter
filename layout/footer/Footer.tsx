import React, {ReactNode} from "react";
import {ReactNodeArray} from "prop-types";
import "./Footer.css";

const Footer: React.FunctionComponent<Props> = (props: Props) => {
    return (<footer className="footer" style={{height: props.height || "40px"}}>
        {props.children}
    </footer>);
};

interface Props {
    height?: string;
    children: ReactNodeArray | ReactNode
}

export default Footer;
