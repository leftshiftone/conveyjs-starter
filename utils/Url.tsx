export class Url {
    public static current() {
        return new URL(window.location.href);
    }

    public static getParam(name: string) {
        return Url.current().searchParams.get(name);
    }

    public static getPath() {
        return Url.current().pathname;
    }
}
