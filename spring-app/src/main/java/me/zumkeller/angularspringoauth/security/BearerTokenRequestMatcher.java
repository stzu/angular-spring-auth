package me.zumkeller.angularspringoauth.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;
import org.springframework.security.web.util.matcher.RequestMatcher;

class BearerTokenRequestMatcher implements RequestMatcher {

    private final BearerTokenResolver bearerTokenResolver = new DefaultBearerTokenResolver();

    @Override
    public boolean matches(final HttpServletRequest request) {
        try {
            //     HeaderBearerTokenResolver instead of DefaultBearerTokenResolver
            // TODO READ bearer token from different header (e.g. oidc_access_token)
            return this.bearerTokenResolver.resolve(request) != null;
        } catch (final OAuth2AuthenticationException ex) {
            return false;
        }
    }

}
