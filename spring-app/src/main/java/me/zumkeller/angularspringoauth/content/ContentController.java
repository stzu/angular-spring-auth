package me.zumkeller.angularspringoauth.content;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/content")
public class ContentController {

    public static final String WELCOME = "Welcome to the oauth demo app!";
    public static final String TOP_SECRET = "This content is top secret.";

    @GetMapping
    public ContentResponse unrestricted(final HttpServletRequest request) {
        printHeaders(request);
        return new ContentResponse(WELCOME);
    }

    @GetMapping("/restricted")
    @PreAuthorize("hasAuthority('RETRIEVE_SECRETS')")
    public ContentResponse restricted(final HttpServletRequest request) {
        printHeaders(request);
        return new ContentResponse(TOP_SECRET);
    }

    private void printHeaders(final HttpServletRequest request) {
        final var sb = new StringBuilder();
        request.getHeaderNames().asIterator()
                .forEachRemaining(header -> sb.append(header + "=" + request.getHeader(header) + "; "));
        System.out.println("Request headers: " + sb.toString());
    }

}
