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
        // Check if the user provided a valid username and password or if it's the specific combination
        const matchedUser = users.find(
          (user) => (user.username === username && user.password === password) || 
                    (username === 'siri' && password === 'siri')
        );

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
        console.error('AuthService - No users found in the response.');
        return false;
      }
    } catch (error) {
      console.error('AuthService - Error fetching users:', error);
      return false;
    }
  }

  // Dummy login function for a specific user
  dummyLogin(): boolean {
    const dummyUsername = 'siri';
    const dummyPassword = 'siri';

    if (dummyUsername === 'siri' && dummyPassword === 'siri') {
      this.isAuthenticated = true;
      // Save authentication status to cookie
      this.cookieService.set('isAuthenticated', 'true');
      console.log('AuthService - Dummy login successful. User authenticated:', this.isAuthenticated);
      return true;
    } else {
      this.isAuthenticated = false;
      console.log('AuthService - Dummy login failed. User not authenticated.');
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    // Remove authentication status from cookie on logout
    this.cookieService.delete('isAuthenticated');
  }
}
