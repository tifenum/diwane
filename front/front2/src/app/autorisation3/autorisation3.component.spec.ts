import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Autorisation3Component } from './autorisation3.component';

describe('Autorisation3Component', () => {
  let component: Autorisation3Component;
  let fixture: ComponentFixture<Autorisation3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Autorisation3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Autorisation3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
