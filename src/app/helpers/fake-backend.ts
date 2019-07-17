import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, merge, throwError } from 'rxjs';
import { User } from '../models/User';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const users: User[] = [{ id: 1, username: 'Admin', password: '123456', firstName: 'Binh', lastName: 'tran'}];

        const authHeader = req.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');

        return of(null).pipe(mergeMap(() => {
            
            if (req.url.endsWith('/users/authenticate') && req.method === 'POST') {
                const user = users.find(x => x.username === req.body.username && x.password === req.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: `fake-jwt-token`
                });
            }

            if(req.url.endsWith('/users') && req.method === 'GET') {
                if (!isLoggedIn) return unauthorised();
                return ok(users);
            }

            return next.handle(req);
        }))
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());


        // tslint:disable-next-line: no-shadowed-variable
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};