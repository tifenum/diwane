import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoubureauxxComponent } from './ajoubureauxx.component';

describe('AjoubureauxxComponent', () => {
  let component: AjoubureauxxComponent;
  let fixture: ComponentFixture<AjoubureauxxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoubureauxxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoubureauxxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
