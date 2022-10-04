# Demo project for integrating OAuth with Angular and Spring Boot

This project serves as a playground to test different approaches for integrating OIDC / OAuth with an Angular frontend
and a
Spring Boot backend.

The main components of the system are an Apache httpd hosting an Angular SPA, a Spring Boot backend and an Authorization
Server (e.g. keycloak). The backend provides resources which are available to anyone as well as restricted resources
that require authorization. The user permissions are managed by the backend and not handled via OAuth claims, thus the
Angular app always call the Spring Boot backend to retrieve the user permissions.

There is a different branch for each approach, in which the components are serving different purposes:

<table>
  <thead>
  <tr>
    <th>Approach</th>
    <th>Apache httpd</th>
    <th>Angular</th>
    <th>Spring Boot</th>
    <th>Pros</th>
    <th>Cons</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <th>1. implicit-flow-in-angular-app</th>
    <td>
      <ul>
        <li>hosts the Angular app</li>
        <li>serves the Angular app to anyone</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>angular-oauth2-oidc handles implicit flow to create access token</li>
        <li>angular-oauth2-oidc's HttpInterceptor adds access_token for each backend request</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>acts as Resource Server</li>
        <li>validates the access_token</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>no configuration in Apache</li>
        <li>angular-oauth2-oidc in Angular requires only little configuration</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Implicit flow in Angular SPA is deprecated and considered insecure</li>
        <li>Angular app is shown for a split-second before forwarding to login page</li>
        <li>access_token is read by the Angular client</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>2. implicit-flow-with-apache</th>
    <td>
      <ul>
        <li>hosts the Angular app</li>
        <li>requires auth before serving Angular app</li>
        <li>mod_auth_openidc handles implicit / code flow to create access token</li>
        <li>mod_auth_openidc stores auth session information</li>
        <li>mod_auth_openidc provides OIDC user information via endpoint</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>requests access_token + username from mod_auth_openidc's endpoint</li>
        <li>HttpInterceptor adds access_token in for each backend request</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>acts as Resource Server</li>
        <li>validates the access_token</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Apache handles the OAuth flow</li>
        <li>Implicit or Authenticate Code flows can be used</li>
        <li>No library necessary in Angular app</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Apache holds session information (could be stored client-side to enable clustered Apache)</li>
        <li>access_token is read by the Angular client</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>3. apache-reverseproxy-to-spring</th>
    <td>
      <ul>
        <li>hosts the Angular app</li>
        <li>requires auth before serving Angular app</li>
        <li>mod_auth_openidc handles implicit / code flow to create access token</li>
        <li>mod_auth_openidc stores auth session information</li>
        <li>provides a reverse proxy to forward requests to Spring Boot backend</li>
        <li>attaches access_token to forwarded requests</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>no need for OAuth / OIDC handling</li>
        <li>all backend requests are enriched with authentication by Apache</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>acts as Resource Server</li>
        <li>validates the access_token</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Apache handles the OAuth flow</li>
        <li>Implicit or Authenticate Code flows can be used</li>
        <li>access_token is not read by the Angular client</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Apache holds session information (could be stored client-side to enable clustered Apache)</li>
        <li>Requires a little knowledge about Apache configuration</li>
      </ul>
    </td>
  </tr>
  <tr>
    <th>4. basic-auth-with-oauth<br/>(not a branch)</th>
    <td>
      <ul>
        <li>hosts the Angular app</li>
        <li>requires auth before serving Angular app</li>
        <li>mod_auth_openidc handles implicit / code flow to create access token</li>
        <li>mod_auth_openidc stores auth session information</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>provides no OAuth / OIDC handling</li>
        <li>requests username from mod_auth_openidc's endpoint</li>
        <li>uses Basic Auth credentials for requests to Spring Boot</li>
        <li>Basic Auth credentials can be retrieved from the Angular app's code in the browser</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>provides no OAuth / OIDC handling</li>
        <li>authenticates requests with Basic Auth</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Compatibility with backends that require Basic Auth</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Basic Auth credentials are shared among users</li>
        <li>Security risk as Basic Auth user requires exhaustive permissions and its credentials are stored in plain
          text in the Angular app
        </li>
      </ul>
    </td>
  </tr>
  </tbody>
</table>

