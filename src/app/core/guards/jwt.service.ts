import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  encodeBase64(payload: any): string {
    const payloadString = JSON.stringify(payload);
    const encodedPayload = btoa(payloadString); // Using btoa to base64 encode
    console.log('JwtService - Encoded payload:', payload, ' => ', encodedPayload);
    return encodedPayload;
  }

  decodeBase64(encodedPayload: string): any {
    const decodedString = atob(encodedPayload); // Using atob to base64 decode
    const decodedPayload = JSON.parse(decodedString);
    console.log('JwtService - Decoded payload:', encodedPayload, ' => ', decodedPayload);
    return decodedPayload;
  }
}
