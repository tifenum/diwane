import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForm1Component } from './update-form1.component';

describe('UpdateForm1Component', () => {
  let component: UpdateForm1Component;
  let fixture: ComponentFixture<UpdateForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateForm1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
