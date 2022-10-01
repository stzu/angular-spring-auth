import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const defaultAuthorizationRequest = req.clone({
      setHeaders: {'Authorization': 'Basic YmFzaWNBdXRoVXNlcjp0ZXN0'}
    });
    return next.handle(defaultAuthorizationRequest);
  }
}
