package me.zumkeller.angularspringoauth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {

    private final JwtUserConverter jwtUserConverter;

    public SecurityConfig(final JwtUserConverter jwtUserConverter) {
        this.jwtUserConverter = jwtUserConverter;
    }

    @Bean
    @Order(2)
    public SecurityFilterChain basicAuthFilterChain(final HttpSecurity http) throws Exception {
        http.authorizeRequests(authorize -> authorize //
                        .antMatchers("/content/restricted", "/users/**").authenticated() //
                        .anyRequest().permitAll()) //
                .httpBasic() //
                .and().csrf().disable() //
                .cors();
        return http.build();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain oAuthFilterChain(final HttpSecurity http) throws Exception {

        http.requestMatcher(new BearerTokenRequestMatcher()) //
                .authorizeRequests(authorize -> authorize //
                        .antMatchers("/content/restricted", "/users/**").authenticated() //
                        .anyRequest().permitAll()) //
                .oauth2ResourceServer(configure -> configure.jwt().jwtAuthenticationConverter(jwtUserConverter)) //
                .cors();
        return http.build();
    }

    @Bean
    public static BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(4);
    }

}