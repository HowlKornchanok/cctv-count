// map-modal.component.ts

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit,OnDestroy {

  @Input() showModal: boolean = false;
  @Input() pinCoordinates: number[] = [];
  @Output() closeModalEvent = new EventEmitter();
  private pinCoordinatesSubscription!: Subscription;

  cameras: any[] = [
    { name: 'Camera 1', location: 'Location 1' },
    { name: 'Camera 2', location: 'Location 2' },
    { name: 'Camera 3', location: 'Location 3' },
    { name: 'Camera 4', location: 'Location 4' },
  ];

  constructor(private modalService: ModalService) {}
  ngOnInit(): void {
    this.pinCoordinatesSubscription = this.modalService.pinCoordinates$.subscribe(
      (coordinates) => {
        this.pinCoordinates = coordinates;
        console.log('Received Pin Coordinates:', this.pinCoordinates);
      }
    );
  }

  ngOnDestroy(): void {
    this.pinCoordinatesSubscription.unsubscribe();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  getPinCoordinatesForCamera(cameraName: string): number[] | null {
    const camera = this.cameras.find(c => c.name === cameraName);
    return camera ? this.pinCoordinates : null;
  }
}
