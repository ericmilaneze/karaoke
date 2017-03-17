import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarMusicaComponent } from './adicionar-musica.component';

describe('AdicionarMusicaComponent', () => {
  let component: AdicionarMusicaComponent;
  let fixture: ComponentFixture<AdicionarMusicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarMusicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
