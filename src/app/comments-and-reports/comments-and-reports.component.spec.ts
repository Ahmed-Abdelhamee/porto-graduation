import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsAndReportsComponent } from './comments-and-reports.component';

describe('CommentsAndReportsComponent', () => {
  let component: CommentsAndReportsComponent;
  let fixture: ComponentFixture<CommentsAndReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsAndReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsAndReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
