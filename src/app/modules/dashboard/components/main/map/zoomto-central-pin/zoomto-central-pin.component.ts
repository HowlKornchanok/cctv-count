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
    zoomToCentralPinButton.style.left = '0.5rem'; 
    zoomToCentralPinButton.addEventListener('click', () => {
      this.zoomToCentralPin();
    });

    container.appendChild(zoomToCentralPinButton);

    super({
      element: container,
      target: undefined,
    });
  }


  private zoomToCentralPin(): void {

    const map = this.getMap() as Map;
    const view = map.getView() as View;
    const centralPinCoordinates = fromLonLat([99.6239, 7.5645]);
    const zoomLevel = 14;
    view.animate({
      center: centralPinCoordinates,
      zoom: zoomLevel,
      duration: 1000,
    });
  }
}
