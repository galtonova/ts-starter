import * as dotenv from 'dotenv';

export class EnvironmentVariables {
    LOGLEVEL: number = process.env.LOGLEVEL ? +process.env.LOGLEVEL : 0;
    APIURL: string = ((process.env.URL || 'http://localhost') + '/').replace(/\/\/$/, '/');

    constructor() {
        dotenv.config();
    }
}

let _environmentVariables: EnvironmentVariables;
export const env = <T extends keyof EnvironmentVariables>(envName: T): EnvironmentVariables[T] => {
    if (!_environmentVariables) {
        _environmentVariables = new EnvironmentVariables();
    }
    return _environmentVariables[envName];
};
