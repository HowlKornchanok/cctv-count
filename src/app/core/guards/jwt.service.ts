// jwt.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // Function to encode the payload as base64
  encodeBase64(payload: any): string {
    const payloadString = JSON.stringify(payload);
    return btoa(payloadString); // Using btoa to base64 encode
  }

  // Function to decode the base64-encoded payload
  decodeBase64(encodedPayload: string): any {
    const decodedString = atob(encodedPayload); // Using atob to base64 decode
    return JSON.parse(decodedString);
  }
}
