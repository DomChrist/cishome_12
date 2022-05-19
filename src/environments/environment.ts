// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const cisHome = {
    "service" : 'http://localhost:8080/api/',
    "base" : 'http://localhost:8080/',
    "socket" : 'ws://localhost:8080/',
    //"service" : 'http://pi4:8088/',
    // "login" : "http://pi4:8180/auth/realms/CIS/protocol/openid-connect/auth?client_id=account&redirect_uri=http://localhost:4200/auth/token&response_type=code&scope=openid"
    // "login" : "http://localhost:8082/auth/realms/CIS/protocol/openid-connect/auth?client_id=cishome&redirect_uri=http://localhost:4200/auth/token&response_type=code&scope=openid"
    "login" : "http://localhost:8082/auth/realms/CIS/protocol/openid-connect/auth?client_id=cishome&response_type=code&scope=openid"
};

const keycloak = {
    // "host" : "http://pi4:8180/auth/realms/CIS/account/",
    "host" : "http://localhost:8082/auth/realms/CIS/account/",
    "realm" : "CIS",
    "client" : "cishome"
};


export const environment = {
    production: false,
    serviceUrl: 'http://localhost:8080',

    keycloak : keycloak,

    cisHome : cisHome

};
