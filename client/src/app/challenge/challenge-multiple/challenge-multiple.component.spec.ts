import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeMultipleComponent } from './challenge-multiple.component';

describe('ChallengeMultipleComponent', () => {
  let component: ChallengeMultipleComponent;
  let fixture: ComponentFixture<ChallengeMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
