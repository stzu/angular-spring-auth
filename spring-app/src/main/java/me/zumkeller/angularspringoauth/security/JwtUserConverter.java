package me.zumkeller.angularspringoauth.security;

import static java.util.stream.Collectors.toList;

import java.util.Collection;

import me.zumkeller.angularspringoauth.users.UserRepository;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Component
public class JwtUserConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final UserRepository users;

    public JwtUserConverter(final UserRepository users) {
        this.users = users;
    }

    @Override
    public AbstractAuthenticationToken convert(final Jwt jwt) {
        final String username = jwt.getClaimAsString("preferred_username");
        final Collection<GrantedAuthority> authorities =
                users.getUser(username).getPermissions().stream().map(SimpleGrantedAuthority::new).collect(toList());
        return new JwtAuthenticationToken(jwt, authorities, username);
    }
}
