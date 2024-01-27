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
import { ModalService } from 'src/app/core/services/modal.service';
@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule,MapModalComponent],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: Map;
  public showModal: boolean = false;
  public jsonData: any[] = [];
  @ViewChild(MapModalComponent) mapModalComponent!: MapModalComponent;


  constructor(private modalDataService: ModalService) {}

  ngOnInit(): void {


    this.map = new Map({
      controls: defaultControls().extend([
        new ZoomToCentralPin()
      ]),
      
    
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([99.6239, 7.5645]),
        zoom: 15,
        maxZoom: 20,
      }),
    });

    // Add a central pin to the map
    this.addPin([99.6239, 7.5645], 'Central Pin');

    // Add more pins around Trang
    this.addPin([99.6112, 7.5625], 'Pin 1');
    this.addPin([99.6295, 7.5755], 'Pin 2');
    this.addPin([99.6383, 7.5578], 'Pin 3');
    

  }
  
  
  addPin(coordinates: number[], label: string): void {
    const pinElement = this.createPinElement(label);
    const buttonElement = this.createPinButton(label);

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


    pinElement.addEventListener('click', () => {
      this.zoomToPin(coordinates);
    });
    buttonElement.addEventListener('click', () => {
      this.openMapModal(coordinates);
    });
    

    this.map.addOverlay(pinOverlay);
    this.map.addOverlay(buttonOverlay);

  }

  createPinElement(label: string): HTMLElement {
    const pinElement = document.createElement('div');

    pinElement.className = 'pin';
    pinElement.innerHTML = `<img src="/assets/icons/pinicon.png" class="pin-icon" /><div class="pin-label">${label}</div>`;
    

    return pinElement;
  }
  createPinButton(label: string): HTMLElement {
    const buttonElement = document.createElement('button');

    buttonElement.style.width = '100px'; 
    buttonElement.style.height = '30px';
    buttonElement.style.marginTop = '100px';
    
    buttonElement.className = 'pin-button';
    buttonElement.innerText = 'Open Map';
    

    return buttonElement;
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