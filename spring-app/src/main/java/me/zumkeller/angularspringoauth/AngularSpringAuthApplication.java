package me.zumkeller.angularspringoauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@SpringBootApplication
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AngularSpringAuthApplication {

    public static void main(final String[] args) {
        SpringApplication.run(AngularSpringAuthApplication.class, args);
    }

}
