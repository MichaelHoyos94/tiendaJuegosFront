import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesManagementComponent } from './games-management.component';

describe('GamesManagementComponent', () => {
  let component: GamesManagementComponent;
  let fixture: ComponentFixture<GamesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamesManagementComponent]
    });
    fixture = TestBed.createComponent(GamesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
