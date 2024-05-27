import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandevalidComponent } from './demandevalid.component';

describe('DemandevalidComponent', () => {
  let component: DemandevalidComponent;
  let fixture: ComponentFixture<DemandevalidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandevalidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandevalidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
