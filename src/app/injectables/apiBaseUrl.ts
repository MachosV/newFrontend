import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ConfigurationService } from '../appConfiguration/config';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(
    private configService: ConfigurationService
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(!req.url.startsWith("data")){
      return next.handle(req);
    }
    return next.handle(req.clone({ url: this.configService.getBaseURL()+req.url }))
  }
}