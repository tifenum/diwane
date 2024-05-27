import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autorisation4Component } from './autorisation4.component';

describe('Autorisation4Component', () => {
  let component: Autorisation4Component;
  let fixture: ComponentFixture<Autorisation4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Autorisation4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Autorisation4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
