import {
    Subject,
    BehaviorSubject
} from "rxjs";

// to trigger the Progress Module
//  - add Notification in Behaviour with "max_progress" to set max progress
//  - add Notification in Behaviour with "progress" to increase progress counter
//  - see @lib/convey/handler/ChannelHandlers.tsx for update routine
//  - see @layout/footer/Footer.tsx for implementation
export class ProgressConnector {
    public static MaxProgress = new BehaviorSubject<number>(0);
    public static Progress = new BehaviorSubject<number>(0);
    public static ProgressOut = new Subject<number>();

    constructor() {
        ProgressConnector.updateProgressOut(0);
    }

    // Max Progress
    public static setMaxProgress(value: number) {
        this.updateMaxProgress(value);
    }

    private static updateMaxProgress(value: number) {
        this.MaxProgress.next(value);
    }

    // Progress
    public static setProgress(value: number) {
        // @ts-ignore
        const newProgress: number = parseInt(ProgressConnector.Progress.value) + parseInt(value);
        this.updateProgress(newProgress);
    }

    private static updateProgress(value: number) {
        this.Progress.next(value);
        this.ProgressOut.next((value / ProgressConnector.MaxProgress.value) * 100);
    }

    private static updateProgressOut(value: number) {
        this.ProgressOut.next(value);
    }
}
