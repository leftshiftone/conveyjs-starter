import React, {
    useEffect,
    useState,
    ReactNode
} from "react";
import {ReactNodeArray} from "prop-types";
import "./Footer.css";

import {ProgressConnector} from "@lib/shellConnector/ProgressConnector";

export default function(props: IProps) {
    // current will contain progress in %
    const [current, setCurrent] = useState<number>(0);

    useEffect(() => {
        let progObs = ProgressConnector.ProgressOut.asObservable();
        const progSub = progObs.subscribe((data) => {
            setCurrent(data);
        });

        return (() => {
            progSub.unsubscribe();
        })
    }, []);

    return (
        <footer className="footer" style={{height: props.height || "40px"}}>
            {props.children}
        </footer>
    );
}

interface IProps {
    height?: string;
    children: ReactNodeArray | ReactNode
}
