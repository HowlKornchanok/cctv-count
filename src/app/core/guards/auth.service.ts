import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = this.cookieService.get('isAuthenticated') === 'true';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.http.get<any[]>('http://localhost:3000/users').toPromise();

      if (users && users.length > 0) {
        const matchedUser = users.find((user) => user.username === username && user.password === password);

        if (matchedUser) {
          this.isAuthenticated = true;
          // Save authentication status to cookie
          this.cookieService.set('isAuthenticated', 'true');
          console.log('AuthService - User authenticated:', this.isAuthenticated);
          return true;
        } else {
          this.isAuthenticated = false;
          console.log('AuthService - Authentication failed. User not authenticated.');
          return false;
        }
      } else {
        // Fallback: Allow access with specific credentials if unable to connect to localhost:3000
        if (username === 'siri' && password === 'siri') {
          this.isAuthenticated = true;
          // Save authentication status to cookie
          this.cookieService.set('isAuthenticated', 'true');
          console.log('AuthService - Fallback: User authenticated with fallback credentials.');
          return true;
        } else {
          console.error('AuthService - No users found in the response, and fallback credentials are incorrect.');
          return false;
        }
      }
    } catch (error) {
      // Fallback: Allow access with specific credentials if unable to connect to localhost:3000
      if (username === 'siri' && password === 'siri') {
        this.isAuthenticated = true;
        // Save authentication status to cookie
        this.cookieService.set('isAuthenticated', 'true');
        console.log('AuthService - Fallback: User authenticated with fallback credentials.');
        return true;
      } else {
        console.error('AuthService - Error fetching users and fallback credentials are incorrect:', error);
        return false;
      }
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    // Remove authentication status from cookie on logout
    this.cookieService.delete('isAuthenticated');
  }
}
