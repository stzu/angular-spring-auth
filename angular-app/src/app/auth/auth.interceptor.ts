import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from "../../environments/environment";

/**
 *
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const defaultAuthorizationRequest = req.clone({
      setHeaders: {"Authorization": "Bearer " + environment.access_token}
    });
    return next.handle(defaultAuthorizationRequest);
  }
}
