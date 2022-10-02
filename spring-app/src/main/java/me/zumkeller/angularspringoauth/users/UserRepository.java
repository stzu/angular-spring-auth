package me.zumkeller.angularspringoauth.users;

import static java.util.Collections.emptyList;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Repository;

/**
 * This class provides users with their permissions. Due to the demo scope of this application, the information is
 * stored in a Map instead of a database.
 */
@Repository
public class UserRepository {

    public static final String RETRIEVE_SECRETS = "RETRIEVE_SECRETS";
    private final Map<String, User> users = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {

        users.put("basicAuthUser", new User("basicAuthUser", List.of(RETRIEVE_SECRETS)));
        users.put("basicAuthDummy", new User("basicAuthDummy", emptyList()));
        users.put("alice", new User("alice", List.of(RETRIEVE_SECRETS)));
        users.put("dummy", new User("dummy", emptyList()));
    }

    public User getUser(final String username) {
        return users.get(username);
    }

}
