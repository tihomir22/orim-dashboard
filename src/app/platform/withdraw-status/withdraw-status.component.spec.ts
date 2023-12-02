import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawStatusComponent } from './withdraw-status.component';

describe('WithdrawStatusComponent', () => {
  let component: WithdrawStatusComponent;
  let fixture: ComponentFixture<WithdrawStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
