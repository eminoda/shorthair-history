import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDrawComponent } from './page-draw.component';

describe('PageDrawComponent', () => {
  let component: PageDrawComponent;
  let fixture: ComponentFixture<PageDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
