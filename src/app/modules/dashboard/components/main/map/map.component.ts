import { CommonModule } from '@angular/common';
import { Component, OnInit,ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls} from 'ol/control.js';
import { MapModalComponent } from './map-modal/map-modal.component';
import { ZoomToCentralPin } from './zoomto-central-pin/zoomto-central-pin.component';
import { ModalService } from './services/modal.service';
import { MapDataService } from './services/map-data.service';
@Component({
  selector: '[map]',
  standalone: true,
  imports: [CommonModule,MapModalComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapDataService]
})
export class MapComponent implements OnInit {
  map!: Map;
  public showModal: boolean = false;
  public jsonData: any[] = [];
  @ViewChild(MapModalComponent) mapModalComponent!: MapModalComponent;


  constructor(private modalDataService: ModalService, private mapDataService: MapDataService) {}

  getCenterCoordinates(): number[] {
    return [this.jsonData[0].lon, this.jsonData[0].lat];
  }
  ngOnInit(): void {
    this.mapDataService.getMapData().subscribe(data => {
      this.jsonData = data;
      console.log('Camera locations fetched successfully:', this.jsonData);
      const center = [this.jsonData[0].lon, this.jsonData[0].lat];
      

      // Initialize the map
      this.map = new Map({
        controls: defaultControls().extend([
          new ZoomToCentralPin(this.map, center)
        ]),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: 'map',
        view: new View({
          center: fromLonLat(center),
          zoom: 13,
          maxZoom: 20,
        }),
      });
      const zoomToCentralPinControl = new ZoomToCentralPin(this.map, center);
      this.map.addControl(zoomToCentralPinControl);

      
      this.jsonData.forEach(location => {
        const coordinates = [location.lon, location.lat];
        this.addPin(coordinates, location.location_name);
        console.log(coordinates);
      });
    });
  }
  
  
  addPin(coordinates: number[], label: string): void {
    const pinElement = this.createPinElement(label);
    const buttonElement = this.createPinButton(label);
    const pinText = this.createPinText(label);

    const pinOverlay = new Overlay({
      position: fromLonLat(coordinates),
      positioning: 'center-center',
      element: pinElement,
      stopEvent: false,
    });

    const buttonOverlay = new Overlay({
      position: fromLonLat(coordinates),
      positioning: 'center-center',
      element: buttonElement,
      stopEvent: false,
    });

    const TextOverlay = new Overlay({
      position: fromLonLat(coordinates),
      positioning: 'center-center',
      element: pinText,
      stopEvent: false,
    });


    const pinClickHandler = () => {
      this.zoomToPin(coordinates);
    };
    buttonElement.addEventListener('click', () => {
      this.openMapModal(coordinates);
    });
    pinElement.addEventListener('click', pinClickHandler);
    pinText.addEventListener('click', pinClickHandler);

    this.map.addOverlay(pinOverlay);
    this.map.addOverlay(TextOverlay);
    this.map.addOverlay(buttonOverlay);

  }
  createPinText(label: string): HTMLElement {
    const pinText = document.createElement('div');
    pinText.className = 'pin-label';
    pinText.innerHTML = `<div class="pin-label" style="font-weight: bold;">${label}</div>`;
    pinText.style.marginBottom ='40px';
    return pinText;
  }

  createPinElement(label: string): HTMLElement {
    const pinElement = document.createElement('div');

    pinElement.className = 'pin';
    pinElement.innerHTML = '<img src="/assets/icons/map-pin-30.png" class="pin-icon" />'
    const pinText = document.createElement('div');

    pinText.style.position = 'center';
    
    pinElement.appendChild(pinText);

    return pinElement;
  }
  createPinButton(label: string): HTMLElement {
    const container = document.createElement('div');
    container.className = 'ol-zoom-to-central-pin ol-unselectable ol-control';
    container.style.width = '80px';
    container.style.right = '-40px';
    container.style.top = '20px';
    container.style.position = 'center';
  
    const buttonElement = document.createElement('button');
    buttonElement.className = 'pin-button';
    buttonElement.style.width = '80px';
    buttonElement.style.height = '40px';
  


    const TextElement = document.createElement('text');
    TextElement.style.position = 'center';
    TextElement.innerText = 'Open Modal';
    buttonElement.style.lineHeight = '1';

    buttonElement.appendChild(TextElement);
    container.appendChild(buttonElement);
  
    return container;
  }

  

  zoomToPin(coordinates: number[]): void {
    this.map.getView().animate({
      center: fromLonLat(coordinates),
      zoom: 18,
      duration: 1000,
    });
  }


  openMapModal(pinCoordinates: number[]): void {
    
    console.log('Pin Coordinates:', pinCoordinates);
    this.showModal = true;
    this.modalDataService.setPinCoordinates(pinCoordinates);  

  }

  closeModal() {
    this.showModal = false;
  }

}