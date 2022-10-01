package me.zumkeller.angularspringoauth;

import static io.restassured.RestAssured.given;

import io.restassured.specification.RequestSpecification;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class IntegrationTest {

    @LocalServerPort
    protected int port;

    protected static RequestSpecification anonymousUser() {
        return given();
    }

    protected static RequestSpecification unauthorizedUser() {
        return given().auth().basic("basicAuthDummy", "test");
    }

    protected static RequestSpecification basicAuthUser() {
        return given().auth().basic("basicAuthUser", "test");
    }

}
