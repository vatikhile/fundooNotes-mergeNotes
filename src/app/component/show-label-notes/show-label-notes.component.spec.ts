import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLabelNotesComponent } from './show-label-notes.component';

describe('ShowLabelNotesComponent', () => {
  let component: ShowLabelNotesComponent;
  let fixture: ComponentFixture<ShowLabelNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLabelNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLabelNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
