export interface CisUser {
    id: string;
    group: Group;
    userName: string;
    name1: string;
    name2: string;
    phone: string;
    image?: CisImage;
    fullName: string;
    given_name: string;
    family_name: string;
    cisgroup: string;
    roles: string[];
    resource_access: ResourceAccess;

}

export interface Group {
    id: string;
    name: string;
}

export interface CisImage {
    contentType: string;
    image: string;
    baseImage: string;
}

export class Keycloak {
    access_token: string;
    expires_in: number;
    id_token: string;
    refresh_expires_in: number;
    refresh_token: string;
    scope: string;
    session_state: string;
    token_type: string;
}

export interface KeycloakToken {
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    at_hash: string;
    acr: string;
    email_verified: boolean;
    name: string;
    groups: string[];
    preferred_username: string;
    given_name: string;
    resource_access: ResourceAccess;
    cisgroup: string;
    family_name: string;
    email: string;
}

export interface ResourceAccess {
    account: Account;
}

export interface Account {
    roles: string[];
}

