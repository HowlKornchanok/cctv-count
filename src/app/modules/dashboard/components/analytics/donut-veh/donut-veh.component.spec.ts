import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutVehComponent } from './donut-veh.component';

describe('DonutVehComponent', () => {
  let component: DonutVehComponent;
  let fixture: ComponentFixture<DonutVehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutVehComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonutVehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
