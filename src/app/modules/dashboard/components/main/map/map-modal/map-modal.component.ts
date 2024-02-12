import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/dashboard/components/main/map/services/modal.service';
import { LocationData, CameraData } from './location-data.interface';
import { MapDataService } from '../services/map-data.service';

@Component({
  selector: 'app-map-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  providers: [MapDataService]
})
export class MapModalComponent implements OnInit, OnDestroy {
  @Input() showModal: boolean = false;
  @Input() locationNo?: number;
  public jsonData: any[] = [];
  @Output() closeModalEvent = new EventEmitter();
  public locationData: LocationData[] = [];
  public locationNumberNum: number = 0; // Initialize with a default value
  private locationDataSubscription!: Subscription;

  constructor(private modalService: ModalService, private mapDataService: MapDataService) {}

  ngOnInit(): void {
    this.locationDataSubscription = this.modalService.locationData$.subscribe(
      (locationNumber) => {
        // Convert locationNumber to number
        this.locationNumberNum = Number(locationNumber);
        this.locationData = this.jsonData.filter(item => item.location_no === this.locationNumberNum);
        console.log(this.locationNumberNum);
      }
    );
  
    this.mapDataService.getMapData().subscribe(data => {
      this.jsonData = data;
      console.log('Camera locations fetched successfully:', this.jsonData);
    });
  }
  
  ngOnDestroy(): void {
    this.locationDataSubscription.unsubscribe();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  isPlayerLarger: boolean[] = [false, false, false, false];

  togglePlayerSize(index: number): void {
    this.isPlayerLarger[index] = !this.isPlayerLarger[index];
  }
}
