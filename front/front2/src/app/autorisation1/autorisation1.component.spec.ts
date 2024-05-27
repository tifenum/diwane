import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autorisation1Component } from './autorisation1.component';

describe('Autorisation1Component', () => {
  let component: Autorisation1Component;
  let fixture: ComponentFixture<Autorisation1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Autorisation1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Autorisation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
