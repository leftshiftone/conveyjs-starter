import React from 'react';

import { EmitterAware } from "@lib/emitter/Emitter";

export default function(props: Props) {
    return (
        <div className="alert alert-primary" role="alert">
            Custom component "Template" with bootstrap style (class="intro")
        </div>
    )
}

interface Props extends EmitterAware {
    customClass: string
}
