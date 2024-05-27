import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateForm3Component } from './update-form3.component';

describe('UpdateForm3Component', () => {
  let component: UpdateForm3Component;
  let fixture: ComponentFixture<UpdateForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateForm3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
