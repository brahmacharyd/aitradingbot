import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalHistoryComponent } from './signal-history.component';

describe('SignalHistoryComponent', () => {
  let component: SignalHistoryComponent;
  let fixture: ComponentFixture<SignalHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalHistoryComponent]
    });
    fixture = TestBed.createComponent(SignalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
