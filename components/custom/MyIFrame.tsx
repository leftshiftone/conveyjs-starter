import React from 'react';

export default function (props: IMyIFrame) {
    return (
            <iframe id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="600"
                    height="500"
                    src={props.url}>
            </iframe>
    )
}

interface IMyIFrame {
    url: string
}