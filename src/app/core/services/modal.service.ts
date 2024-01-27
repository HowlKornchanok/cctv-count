import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private pinCoordinatesSubject = new BehaviorSubject<number[]>([]);
  pinCoordinates$ = this.pinCoordinatesSubject.asObservable();

  setPinCoordinates(coordinates: number[]): void {
    this.pinCoordinatesSubject.next(coordinates);
  }
}