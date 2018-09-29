import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplateListComponent } from './page-template-list.component';

describe('PageTemplateListComponent', () => {
  let component: PageTemplateListComponent;
  let fixture: ComponentFixture<PageTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
