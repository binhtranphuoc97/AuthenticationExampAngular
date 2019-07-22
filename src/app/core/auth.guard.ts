<<<<<<< HEAD
import { Injectable } from "@angular/core";
=======
import { Injectable } from '@angular/core';
>>>>>>> 1a2813c080d5a5c48ccf36c57cb5e2ff8e6ec41c
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
<<<<<<< HEAD
        
        this.route.navigate(['/login'], { queryParams: { returnUrl: state.url}});
            return false;
    }
}
=======
        this.route.navigate(['/login'], { queryParams: { returnUrl: state.url}});
        return false;
    }
}
>>>>>>> 1a2813c080d5a5c48ccf36c57cb5e2ff8e6ec41c
