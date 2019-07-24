import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../core/config';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    
    constructor(
        private http: HttpClient,
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        debugger
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        debugger
        const result = this.http.post<any>(`${CONFIG.ApiUrls}/users/authenticate`, {username, password})
        .pipe(map(user => {

            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }))
        return result;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}