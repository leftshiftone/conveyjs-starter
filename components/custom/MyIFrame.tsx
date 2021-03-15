import React from 'react';

export default function (props: IMyIFrame) {
    function replaceAmpersands(url: string): string {
        return url.replaceAll("&amp;", "&");
    }

    return (
            <iframe id="routenplanerLink"
                    title="Routenplaner Link"
                    width="100%"
                    height="500"
                    src={replaceAmpersands(props.url)}>
            </iframe>
    )
}

interface IMyIFrame {
    url: string
}