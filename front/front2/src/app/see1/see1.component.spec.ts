import { ComponentFixture, TestBed } from '@angular/core/testing';

import { See1Component } from './see1.component';

describe('See1Component', () => {
  let component: See1Component;
  let fixture: ComponentFixture<See1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [See1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(See1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
