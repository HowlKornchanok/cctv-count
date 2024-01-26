import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumBarComponent } from './sum-bar.component';

describe('SumBarComponent', () => {
  let component: SumBarComponent;
  let fixture: ComponentFixture<SumBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SumBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
