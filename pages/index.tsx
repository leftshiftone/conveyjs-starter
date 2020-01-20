import React from 'react';

import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { testStyle } from 'style/TestStyle';

import _JSXStyle from 'styled-jsx/style'

export default function() {
    return (
        <div>
            <_JSXStyle>{testStyle}</_JSXStyle>
            gaia-identity-web-template
        </div>
    )
}
