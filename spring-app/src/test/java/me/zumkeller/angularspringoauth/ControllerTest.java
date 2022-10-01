package me.zumkeller.angularspringoauth;

import static io.restassured.RestAssured.given;
import static me.zumkeller.angularspringoauth.UserRepository.RETRIEVE_SECRETS;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.emptyArray;

import java.util.stream.Stream;

import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ControllerTest {

    public static final String RESTRICTED = "/restricted";
    public static final String UNRESTRICTED = "/";
    @LocalServerPort
    private int port;

    @ParameterizedTest
    @MethodSource("securityTestParameters")
    void testSecurity(final String description, final RequestSpecification auth, final String path,
            final int expectedStatus) {

        System.out.println(description);
        given(auth).port(port).get(path).then().statusCode(expectedStatus);
    }

    @Test
    void test_authorizedUser_hasPermissions() {

        basicAuthUser().port(port).get("/permissions").then().statusCode(200)
                .body("permissions", contains(RETRIEVE_SECRETS));
    }

    @Test
    void test_unauthorizedUser_hasNoPermissions() {

        unauthorizedUser().port(port).get("/permissions").then().statusCode(200).body("permissions", empty());
    }

    private static Stream<Arguments> securityTestParameters() {
        return Stream.of( //
                Arguments.of("Anonymous user should have access to unrestricted resource", anonymousUser(),
                        UNRESTRICTED, 200), //
                Arguments.of("Anonymous user should be denied access to restricted resource", anonymousUser(),
                        RESTRICTED, 401), //
                Arguments.of("Unauthorized user should have access to unrestricted resource", unauthorizedUser(),
                        UNRESTRICTED, 200), //
                Arguments.of("Unauthorized user should be denied access to restricted resource", unauthorizedUser(),
                        RESTRICTED, 403), //
                Arguments.of("Authorized user should have access to unrestricted resource", basicAuthUser(),
                        UNRESTRICTED, 200), //
                Arguments.of("Authorized user should have access to restricted resource", basicAuthUser(), RESTRICTED,
                        200));
    }

    private static RequestSpecification anonymousUser() {
        return given();
    }

    private static RequestSpecification unauthorizedUser() {
        return given().auth().basic("basicAuthDummy", "test");
    }

    private static RequestSpecification basicAuthUser() {
        return given().auth().basic("basicAuthUser", "test");
    }
}