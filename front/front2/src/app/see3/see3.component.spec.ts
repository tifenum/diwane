import { ComponentFixture, TestBed } from '@angular/core/testing';

import { See3Component } from './see3.component';

describe('See3Component', () => {
  let component: See3Component;
  let fixture: ComponentFixture<See3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [See3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(See3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
