import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!req.url.includes('http') && !req.url.includes('assets')) {
      const baseUrlRequest = req.clone({ url: BASE_URL + req.url });
      return next.handle(baseUrlRequest);
    }
    return next.handle(req.clone({ url: req.url }));
  }

}
