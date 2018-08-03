import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameareaViewerComponent } from './gamearea-viewer.component';

describe('GameareaViewerComponent', () => {
  let component: GameareaViewerComponent;
  let fixture: ComponentFixture<GameareaViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameareaViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameareaViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
