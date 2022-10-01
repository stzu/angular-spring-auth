package me.zumkeller.angularspringoauth.users;

import static me.zumkeller.angularspringoauth.users.UserRepository.RETRIEVE_SECRETS;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;

import me.zumkeller.angularspringoauth.IntegrationTest;
import org.junit.jupiter.api.Test;

class UsersControllerTest extends IntegrationTest {

    @Test
    void test_authorizedUser_hasPermissions() {

        basicAuthUser().port(port).get("/users/current").then().statusCode(200)
                .body("permissions", contains(RETRIEVE_SECRETS));
    }

    @Test
    void test_unauthorizedUser_hasNoPermissions() {

        unauthorizedUser().port(port).get("/users/current").then().statusCode(200).body("permissions", empty());
    }

    @Test
    void test_user_isReturned() {

        basicAuthUser().port(port).get("/users/basicAuthDummy").then().statusCode(200).body("permissions", empty());
    }

}