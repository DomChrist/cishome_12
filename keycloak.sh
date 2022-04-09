docker rm -f keycloak

# docker run --name keycloak -p 8082:8080  \
#    -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=change_me \
#    quay.io/keycloak/keycloak-x \
#    start-dev



docker run -d -p 8082:8080 -e KEYCLOAK_USER=admin --name keycloak -e KEYCLOAK_PASSWORD=admin wizzn/keycloak:14
