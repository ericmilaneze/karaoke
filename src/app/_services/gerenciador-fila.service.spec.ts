import { TestBed, inject } from '@angular/core/testing';
import { GerenciadorFilaService } from './gerenciador-fila.service';

describe('GerenciadorFilaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GerenciadorFilaService]
    });
  });

  it('should ...', inject([GerenciadorFilaService], (service: GerenciadorFilaService) => {
    expect(service).toBeTruthy();
  }));
});
