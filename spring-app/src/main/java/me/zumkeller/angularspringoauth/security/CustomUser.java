package me.zumkeller.angularspringoauth.security;

import java.util.Collection;

import lombok.Getter;
import me.zumkeller.angularspringoauth.User;
import org.springframework.security.core.GrantedAuthority;

@Getter
public class CustomUser extends org.springframework.security.core.userdetails.User {

    private static final long serialVersionUID = 1L;
    private final User user;

    public CustomUser(final String username, final String password,
            final Collection<? extends GrantedAuthority> authorities, final User user) {
        super(username, password, authorities);
        this.user = user;
    }

    @Override
    public boolean equals(final Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
