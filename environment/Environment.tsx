/**
 * @author benjamin.krenn@leftshift.one - 6/19/19.
 * @since 0.1.0
 */
export class Environment {
    readonly url: string;
    readonly identityId: string;
    readonly username: string;
    readonly password: string;
    readonly env: Env;

    private constructor(url: string, identityId: string, username: string, password: string, env: Env) {
        this.url = url;
        this.identityId = identityId;
        this.username = username;
        this.password = password;
        this.env = env;
    }

    static async from(url: string): Promise<Environment> {
        try {
            const env = await fetch(url).then(r => r.json());
            return new Environment(
                env.gaia_url,
                env.gaia_identity_id,
                env.gaia_username,
                env.gaia_password,
                from(env.gaia_env)
            )
        } catch (e) {
            return new Environment(
                // "ws://localhost:61616/mqtt",
                "wss://gaia.leftshift.one/mqtt",
                "",
                "",
                "",
                Env.DEV
            )
        }

    }
}

export enum Env {
    PROD,
    DEV
}

const from = (envString: string): Env => {
    switch (envString.toUpperCase()) {
        case "DEV":
            return Env.DEV;
        case "PROD":
            return Env.PROD;
        default:
            throw Error(`Invalid env: ${envString}`)
    }
};
