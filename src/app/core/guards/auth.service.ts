import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Load initial authentication status from storage or set to false
  isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.http.get<any[]>('http://localhost:3000/users').toPromise();

      if (users && users.length > 0) {
        const matchedUser = users.find((user) => user.username === username && user.password === password);
        

        if (matchedUser) {
          // Create a JWT payload (for simplicity, just using user ID here)
          const jwtPayload = { userId: matchedUser.id };
          

          // Encode the payload as base64 and store it in localStorage
          const encodedJwt = this.jwtService.encodeBase64(jwtPayload);
          localStorage.setItem('jwtToken', encodedJwt);

          this.isAuthenticated = true;
          console.log('Encoded JWT:', encodedJwt);
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

  logout(): void {
    // Remove the JWT token from localStorage on logout
    localStorage.removeItem('jwtToken');
    this.isAuthenticated = false;
  }
}
