// zoom-to-central-pin.control.ts

import Control from 'ol/control/Control';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

export class ZoomToCentralPin extends Control {
  constructor() {
    const container = document.createElement('div');
    container.className = 'ol-zoom-to-central-pin ol-unselectable ol-control';
    
    const zoomToCentralPinButton = document.createElement('button');
    zoomToCentralPinButton.innerHTML = 'C';
    zoomToCentralPinButton.style.position = 'absolute';
    zoomToCentralPinButton.style.top = '70px';
    zoomToCentralPinButton.style.left = '0.5rem'; // Adjust the left position as needed
    zoomToCentralPinButton.addEventListener('click', () => {
      this.zoomToCentralPin();
    });

    container.appendChild(zoomToCentralPinButton);

    super({
      element: container,
      target: undefined,
    });
  }

  // Function to zoom to the central pin
  private zoomToCentralPin(): void {
    // Type assertion to let TypeScript know that this.getMap() is an instance of Map
    const map = this.getMap() as Map;

    // Type assertion to let TypeScript know that map.getView() is an instance of View
    const view = map.getView() as View;

    // Get the central pin coordinates and zoom level
    const centralPinCoordinates = fromLonLat([99.6239, 7.5645]);
    const zoomLevel = 15;

    // Zoom to the central pin using the map's view
    view.animate({
      center: centralPinCoordinates,
      zoom: zoomLevel,
      duration: 1000,
    });
  }
}
