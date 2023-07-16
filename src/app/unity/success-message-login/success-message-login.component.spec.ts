import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessageLoginComponent } from './success-message-login.component';

describe('SuccessMessageLoginComponent', () => {
  let component: SuccessMessageLoginComponent;
  let fixture: ComponentFixture<SuccessMessageLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessMessageLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessMessageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
