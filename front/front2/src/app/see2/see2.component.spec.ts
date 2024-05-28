import { ComponentFixture, TestBed } from '@angular/core/testing';

import { See2Component } from './see2.component';

describe('See2Component', () => {
  let component: See2Component;
  let fixture: ComponentFixture<See2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [See2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(See2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
