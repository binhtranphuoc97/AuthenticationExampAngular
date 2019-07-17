import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { CONFIG } from '../core/config';


@Injectable({ providedIn: 'root'})
export class UserService {
    constructor(
        private http: HttpClient,
    ) {}

    getAll() {
        const result = this.http.get<User[]>(`${CONFIG.ApiUrls}/users`);
        return result;
    }
}