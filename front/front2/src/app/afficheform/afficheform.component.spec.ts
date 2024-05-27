import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheformComponent } from './afficheform.component';

describe('AfficheformComponent', () => {
  let component: AfficheformComponent;
  let fixture: ComponentFixture<AfficheformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AfficheformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfficheformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
