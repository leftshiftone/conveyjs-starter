export class ConveyProperties {
    private readonly properties : Map<string, any>;
    constructor() { this.properties = new Map() }
    public set(key: string, val: any) { this.properties.set(key, val) }
    public get(key: string) { this.properties.get(key) }
    get getAll() { return this.properties }
}
