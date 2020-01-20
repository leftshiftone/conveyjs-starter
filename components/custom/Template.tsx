import React from 'react';

import { EmitterAware } from "@lib/emitter/Emitter";

export default function(props : Props) {
    return (
        <div className="alert alert-primary" role="alert">
            Custom component "Template" with bootstrap style
        </div>
    )
}

interface Props extends EmitterAware {
    forClass: string
}
