import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedemandesComponent } from './seedemandes.component';

describe('SeedemandesComponent', () => {
  let component: SeedemandesComponent;
  let fixture: ComponentFixture<SeedemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeedemandesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeedemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
