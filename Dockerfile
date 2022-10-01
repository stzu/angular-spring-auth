FROM httpd:2.4

COPY angular-app/target/dist/oauth-demo/ /usr/local/apache2/htdocs/
