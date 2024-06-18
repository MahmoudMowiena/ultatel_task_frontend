import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPopoverComponent } from './password-popover.component';

describe('PasswordPopoverComponent', () => {
  let component: PasswordPopoverComponent;
  let fixture: ComponentFixture<PasswordPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
