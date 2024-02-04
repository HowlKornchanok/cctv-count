import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard - Checking authentication status:', this.authService.isAuthenticated);
  
    if (this.authService.isAuthenticated) {
      return true;
    } else {
      // Redirect to the sign-in page with the return URL
      console.warn('AuthGuard - Not authenticated. Redirecting to sign-in.');
      return this.router.createUrlTree(['/auth/sign-in'], {
        queryParams: { returnUrl: state.url },
      });
    }
  }
}
