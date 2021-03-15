import React from 'react';

export default function (props: ITemplate) {
    return (
            <div className="alert alert-primary" role="alert">
                {props.value}
            </div>
    )
}

interface ITemplate {
    value: string
}