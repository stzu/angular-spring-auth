FROM httpd:2.4

RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    ca-certificates libapache2-mod-auth-openidc

COPY angular-app/target/dist/oauth-demo/ /usr/local/apache2/htdocs/
