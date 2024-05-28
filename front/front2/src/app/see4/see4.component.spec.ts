import { ComponentFixture, TestBed } from '@angular/core/testing';

import { See4Component } from './see4.component';

describe('See4Component', () => {
  let component: See4Component;
  let fixture: ComponentFixture<See4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [See4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(See4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
