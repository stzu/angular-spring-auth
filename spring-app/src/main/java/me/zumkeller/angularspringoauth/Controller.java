package me.zumkeller.angularspringoauth;

import static java.util.stream.Collectors.toList;

import java.util.Collection;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Controller {

    public static final String WELCOME = "Welcome to the oauth demo app!";
    public static final String TOP_SECRET = "This content is top secret.";

    @GetMapping
    public Response unrestricted() {
        return new Response(WELCOME);
    }

    @GetMapping("/restricted")
    @PreAuthorize("hasAuthority('RETRIEVE_SECRETS')")
    public Response restricted(final Authentication auth) {
        return new Response(TOP_SECRET, auth.getName(), auth.getAuthorities());
    }

    @GetMapping("/permissions")
    public Response getPermissions(final Authentication auth) {
        return new Response(null, auth.getName(), auth.getAuthorities());
    }

}

@Getter
@Setter
@NoArgsConstructor
class Response {

    private String message;
    private String username;
    private List<String> permissions;

    Response(final String message) {
        this.message = message;
    }

    Response(final String message, final String username, final Collection<? extends GrantedAuthority> authorities) {
        this.message = message;
        this.username = username;
        this.permissions = authorities.stream().map(GrantedAuthority::getAuthority).collect(toList());
    }

}
