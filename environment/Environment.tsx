export enum Env {
    DEV = "DEV",
    PROD = "PROD"
}

export function envOf(input: string): Env {
    switch (input.toUpperCase()) {
        case "DEV":
            return Env.DEV;
        case "PROD":
            return Env.PROD;
        default:
            throw new Error(`Invalid environment '${input}'`);
    }
}

export function envWithDefaultOf(input: string, defaultEnv: Env): Env {
    if (input == null) {
        return defaultEnv;
    }
    try {
        return envOf(input);
    } catch (e) {
        return defaultEnv;
    }
}

export enum GaiaUrl {
    LOCAL = "ws://localhost/mqtt"
}

export enum GaiaPort {
    LOCAL = 61616
}
