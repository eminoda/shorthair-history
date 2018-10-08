import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawBoardComponent } from './draw-board.component';

describe('DrawBoardComponent', () => {
  let component: DrawBoardComponent;
  let fixture: ComponentFixture<DrawBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
