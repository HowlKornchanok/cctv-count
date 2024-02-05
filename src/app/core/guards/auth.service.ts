import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  // ... (previous code)

async login(username: string, password: string): Promise<boolean> {
  try {
    const users = await this.http.get<any[]>('http://localhost:3000/users').toPromise();

    if (users && users.length > 0) {
      // Check if the provided username and password match any user
      const matchedUser = users.find((user) => user.username === username && user.password === password);

      // Allow login without checking for a match if username and password are specific values
      if (username === 'siri' && password === 'siri') {
        const jwtPayload = { userId: 'siri_special_id' };
        const encodedJwt = this.jwtService.encodeBase64(jwtPayload);
        
        localStorage.setItem('jwtToken', encodedJwt);
        this.isAuthenticated = true;

        console.log('Encoded JWT:', encodedJwt);
        console.log('AuthService - User authenticated:', this.isAuthenticated);

        return true;
      }

      // Continue with regular matching logic for other users
      if (matchedUser) {
        const jwtPayload = { userId: matchedUser.id };
        const encodedJwt = this.jwtService.encodeBase64(jwtPayload);
        
        localStorage.setItem('jwtToken', encodedJwt);
        this.isAuthenticated = true;

        console.log('Encoded JWT:', encodedJwt);
        console.log('AuthService - User authenticated:', this.isAuthenticated);

        return true;
      } else {
        this.isAuthenticated = false;
        console.error('AuthService - Authentication failed. User not authenticated.');
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
    localStorage.removeItem('jwtToken');
    this.isAuthenticated = false;
  }
}
