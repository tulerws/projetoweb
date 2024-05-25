import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: dashboardComponent;
  let fixture: ComponentFixture<dashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [dashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(dashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
