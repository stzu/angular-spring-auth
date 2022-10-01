package me.zumkeller.angularspringoauth.users;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UsersController {

    private final UserRepository users;

    public UsersController(final UserRepository users) {
        this.users = users;
    }

    @GetMapping("/current")
    public User getAuthenticatedUser(final Authentication auth) {
        return users.getUser(auth.getName());
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") final String username) {
        return users.getUser(username);
    }

}
