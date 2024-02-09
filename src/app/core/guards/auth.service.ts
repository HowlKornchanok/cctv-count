import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  userRole!: string; // Variable to store user's role

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.http.get<any[]>('http://localhost:3000/users').toPromise();

      if (users && users.length > 0) {
        const matchedUser = users.find((user) => user.username === username && user.password === password);

        if (matchedUser) {
          this.setAuthenticated(matchedUser.username, matchedUser.role); // Pass role to setAuthenticated
          return true;
        } else {
          this.isAuthenticated = false;
          console.log('AuthService - Authentication failed. User not authenticated.');
          return false;
        }
      } else {
        console.error('AuthService - No users found in the response, and fallback credentials are incorrect.');
        return false;
      }
      
    } catch (error) {
      console.error('AuthService - Error fetching users and fallback credentials are incorrect:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole'); // Remove user role on logout
    this.isAuthenticated = false;
    console.log('AuthService - Logging out user');
    this.router.navigate(['/auth/sign-in']); // Redirect to sign-in page on logout
  }

  private setAuthenticated(username: string, role: string): void {
    const tokenPayload = { username: username, expiration: Date.now() + 3600000 }; // 1 hour timeout
    const token = this.jwtService.encodeBase64(tokenPayload);
    localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role); // Store user role
    this.userRole = role; // Set userRole property
    this.isAuthenticated = true;
    console.log('AuthService - User authenticated:', this.isAuthenticated);
    console.log('AuthService - User role:', this.userRole); // Log user role to console
  }
  
  refreshTokenExpiration(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload = this.jwtService.decodeBase64(token);
      tokenPayload.expiration = Date.now() + 3600000; // Refresh expiration time to 1 hour in the future
      const newToken = this.jwtService.encodeBase64(tokenPayload);
      localStorage.setItem('token', newToken);
      console.log('AuthService - Token timeout refreshed.');
    }
  }

  hasRole(role: string): boolean {
    return this.isAuthenticated && this.userRole === role;
  }
}
