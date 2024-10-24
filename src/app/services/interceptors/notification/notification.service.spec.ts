import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snakBar: MatSnackBar;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
    });
    service = TestBed.inject(NotificationService);
    snakBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display error notification', () => {
    spyOn(snakBar, 'open');
    service.error('Invalid location');
    expect(snakBar.open).toHaveBeenCalledWith(
      'Invalid location',
      'Error',
      Object({
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }),
    );
  });

  it('should display success notification', () => {
    spyOn(snakBar, 'open');
    service.success('Valid location');
    expect(snakBar.open).toHaveBeenCalledWith(
      'Valid location',
      'Success',
      Object({
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }),
    );
  });
});
