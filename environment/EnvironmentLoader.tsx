/**
 * @author benjamin.krenn@leftshift.one - 6/21/19.
 * @since 0.1.0
 */
import { Environment } from "./Environment";

export class EnvironmentLoader {

    private readonly environment: Promise<Environment>;
    static INSTANCE: EnvironmentLoader;


    private constructor(environment: Promise<Environment>) {
        this.environment = environment;
    }

    public static instance(): EnvironmentLoader {
        return (this.INSTANCE || new this(Environment.from("/env.json")))
    }

    public async env(): Promise<Environment> {
        return this.environment;
    }
}
