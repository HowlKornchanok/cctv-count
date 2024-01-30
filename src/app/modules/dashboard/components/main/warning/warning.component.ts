import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDataService } from '../map/services/map-data.service';
import { ReportInactiveCameraService } from '../services/report-inactive-camera.service';

@Component({
  selector: '[cemera-warning]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss'],
  providers: [MapDataService , ReportInactiveCameraService]
})
export class WarningComponent {

  public jsonData: any[] = [];
  public groupedData: any[] = [];

  constructor(
    private cameraLocationService: MapDataService,
    private reportService: ReportInactiveCameraService  
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {}

  private loadData(): void {
    this.cameraLocationService.getMapData().subscribe((data) => {
      this.jsonData = data;
    });
  }

  getActiveCameraCount(cameras: any[]): number {
    return cameras.filter(camera => camera.status === 'active').length;
  }
  
  getInactiveCameras(cameras: any[]): string[] {
    return cameras.filter(camera => camera.status === 'inactive').map(camera => `camera ${camera.camera_no}`);
  }

  reportIssue(location: any, cameraNo: number): void {
    const reportData = { location, cameraNo };

    this.reportService.reportIssue(reportData).subscribe(
      response => {
        console.log('Issue reported successfully:', response);

      },
      error => {
        console.error('Error reporting issue:', error);

      }
    );
  }
}
