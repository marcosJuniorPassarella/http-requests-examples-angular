import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  // executará o código abaixo antes de nossa requisição ser enviada
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // para não executar esse interceptor em todas as requisições
    // você pode adicionar o seguinte:
    // if(req.url === 'url que você deseja interceptar')

    console.log(req.url);
    // adicionado novos headers na requisição
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'),
    });
    return next.handle(modifiedRequest);
  }
}
