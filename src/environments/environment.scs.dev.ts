const cisHome = {
    "base" : 'http://localhost:8080/',
    "service" : 'http://localhost:8080/api/',
    "login" : "http://localhost:8082/auth/realms/CIS/protocol/openid-connect/auth?client_id=account&redirect_uri=http://localhost:8080/auth/token&response_type=code&scope=openid"
};

const keycloak = {
    host : "http://localhost:8082/auth/realms/CIS/account/",
    client: "cishome",
    realm : "CIS"
}

export const environment = {
    production: true,
    serviceUrl: 'http://cis-home.selfhost.eu:28081',
    keycloak : keycloak,
    cisHome : cisHome

};

