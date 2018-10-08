import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawElementComponent } from './draw-element.component';

describe('DrawElementComponent', () => {
  let component: DrawElementComponent;
  let fixture: ComponentFixture<DrawElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
