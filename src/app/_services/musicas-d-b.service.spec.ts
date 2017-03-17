import { TestBed, inject } from '@angular/core/testing';
import { MusicasDBService } from './musicas-d-b.service';

describe('MusicasDBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicasDBService]
    });
  });

  it('should ...', inject([MusicasDBService], (service: MusicasDBService) => {
    expect(service).toBeTruthy();
  }));
});
