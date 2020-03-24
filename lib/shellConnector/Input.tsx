import React from "react";

import { Subject } from 'rxjs';

export class InputConnector {
    public static Visible = new Subject<string>();

    constructor() {
        InputConnector.Visible.next('none');
    }

    public static setVisibility(value: string) {
        InputConnector.updateVisible(value);
    }

    private static updateVisible(value: string): void {
        InputConnector.Visible.next(value);
    }
}
