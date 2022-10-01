package me.zumkeller.angularspringoauth.security;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;

import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import me.zumkeller.angularspringoauth.User;
import me.zumkeller.angularspringoauth.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsManager extends InMemoryUserDetailsManager {

    private final UserRepository users;

    public CustomUserDetailsManager(final UserRepository users) {
        this.users = users;
    }

    @PostConstruct
    public void init() {

        createUser(new org.springframework.security.core.userdetails.User("basicAuthUser",
                new BCryptPasswordEncoder(4).encode("test"), List.of(new SimpleGrantedAuthority("RETRIEVE_SECRETS"))));
        createUser(new org.springframework.security.core.userdetails.User("basicAuthDummy",
                new BCryptPasswordEncoder(4).encode("test"), emptyList()));
    }

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {

        final UserDetails userDetails = super.loadUserByUsername(username);
        final User user = users.getUser(username);
        final List<GrantedAuthority> authorities =
                user.getPermissions().stream().map(SimpleGrantedAuthority::new).collect(toList());
        return new CustomUser(userDetails.getUsername(), userDetails.getPassword(), authorities, user);
    }

}
