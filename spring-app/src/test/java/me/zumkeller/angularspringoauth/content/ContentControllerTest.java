package me.zumkeller.angularspringoauth.content;

import static io.restassured.RestAssured.given;
import static me.zumkeller.angularspringoauth.users.UserRepository.RETRIEVE_SECRETS;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.empty;

import java.util.stream.Stream;

import io.restassured.specification.RequestSpecification;
import me.zumkeller.angularspringoauth.IntegrationTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.boot.test.web.server.LocalServerPort;

class ContentControllerTest extends IntegrationTest {

    public static final String RESTRICTED = "/content/restricted";
    public static final String UNRESTRICTED = "/content";

    @ParameterizedTest
    @MethodSource("securityTestParameters")
    void testSecurity(final String description, final RequestSpecification auth, final String path,
            final int expectedStatus) {

        System.out.println(description);
        given(auth).port(port).get(path).then().statusCode(expectedStatus);
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

}