import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CantarComponent } from './cantar.component';

describe('CantarComponent', () => {
  let component: CantarComponent;
  let fixture: ComponentFixture<CantarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CantarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CantarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
