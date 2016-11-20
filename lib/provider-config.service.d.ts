export interface IProvider {
    clientId: string;
    apiVersion?: string;
}
export interface IProviders {
    [provider: string]: IProvider;
}
export declare class ProvidersConfigService {
    constructor(config: IProviders);
}
