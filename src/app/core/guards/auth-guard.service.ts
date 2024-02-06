import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard - Checking authentication status:', this.authService.isAuthenticated);
  
    if (this.authService.isAuthenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenPayload = this.jwtService.decodeBase64(token);
        if (tokenPayload.expiration > Date.now()) {
          console.log('AuthGuard - User is authenticated. Refreshing token expiration.');
          this.authService.refreshTokenExpiration(); // Refresh token expiration
          return true;
        } else {
          console.warn('AuthGuard - Authentication token expired. Redirecting to sign-in.');
          this.authService.logout();
          return this.router.createUrlTree(['/auth/sign-in'], {});
        }
      }
    }

    console.warn('AuthGuard - User not authenticated. Redirecting to sign-in.');
    return this.router.createUrlTree(['/auth/sign-in'], {});
  }
}
