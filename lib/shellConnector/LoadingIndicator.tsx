import React from "react";

import {Subject} from 'rxjs';

export class LoadingConnector {
    public static Visible = new Subject<boolean>();

    constructor() {
        LoadingConnector.Visible.next(false);
    }

    public static setVisibility(value: boolean) {
        LoadingConnector.updateVisible(value);
    }

    private static updateVisible(value: boolean): void {
        LoadingConnector.Visible.next(value);
    }
}
