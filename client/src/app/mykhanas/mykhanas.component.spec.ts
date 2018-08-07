import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MykhanasComponent } from './mykhanas.component';

describe('MykhanasComponent', () => {
  let component: MykhanasComponent;
  let fixture: ComponentFixture<MykhanasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MykhanasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MykhanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
