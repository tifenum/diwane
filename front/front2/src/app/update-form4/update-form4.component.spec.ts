import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForm4Component } from './update-form4.component';

describe('UpdateForm4Component', () => {
  let component: UpdateForm4Component;
  let fixture: ComponentFixture<UpdateForm4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateForm4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateForm4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
