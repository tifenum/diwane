import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForm2Component } from './update-form2.component';

describe('UpdateForm2Component', () => {
  let component: UpdateForm2Component;
  let fixture: ComponentFixture<UpdateForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateForm2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
