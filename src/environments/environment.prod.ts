const cisHome = {
    "service" : 'http://cis-home.selfhost.eu:28081/api/',
    "socket" : 'ws://cis-home.selfhost.eu:28081/',
    "base" : 'http://cis-home.selfhost.eu:28081/',
    "login" : "http://cis-home.selfhost.eu:10582/auth/realms/CIS/protocol/openid-connect/auth?client_id=account&redirect_uri=http://cis.christ-rlp.de/auth/token&response_type=code&scope=openid"
};

const keycloak = {
    host : "http://cis-home.selfhost.eu:10582/auth/realms/CIS/account/",
    realm : "CIS"
}

export const environment = {
    production: true,
    serviceUrl: 'http://cis-home.selfhost.eu:28081',

    cisHome : cisHome

};

