import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autorisation2Component } from './autorisation2.component';

describe('Autorisation2Component', () => {
  let component: Autorisation2Component;
  let fixture: ComponentFixture<Autorisation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Autorisation2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Autorisation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
