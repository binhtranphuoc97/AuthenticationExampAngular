import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private route: Router,
        private authentication: AuthenticationService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authentication.currentUserValue;
        if (currentUser) {
            return true;
        }
        
        this.route.navigate(['/login'], { queryParams: { returnUrl: state.url}});
            return false;
    }
}
