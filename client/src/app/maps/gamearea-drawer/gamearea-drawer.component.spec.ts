import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameareaDrawerComponent } from './gamearea-drawer.component';

describe('GameareaDrawerComponent', () => {
  let component: GameareaDrawerComponent;
  let fixture: ComponentFixture<GameareaDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameareaDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameareaDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
