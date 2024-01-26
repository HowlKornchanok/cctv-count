import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarRankingComponent } from './bar-ranking.component';

describe('BarRankingComponent', () => {
  let component: BarRankingComponent;
  let fixture: ComponentFixture<BarRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
