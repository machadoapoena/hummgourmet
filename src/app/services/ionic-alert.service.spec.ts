import { TestBed } from '@angular/core/testing';

import { IonicAlertService } from './ionic-alert.service';

describe('IonicAlertService', () => {
  let service: IonicAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
