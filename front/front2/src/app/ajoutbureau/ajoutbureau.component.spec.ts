
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutbureauComponent } from './ajoutbureau.component';

describe('AjoutbureauComponent', () => {
  let component: AjoutbureauComponent;
  let fixture: ComponentFixture<AjoutbureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutbureauComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutbureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
