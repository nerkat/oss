import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleTableComponent } from './google-table.component';

describe('GoogleTableComponent', () => {
  let component: GoogleTableComponent;
  let fixture: ComponentFixture<GoogleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
