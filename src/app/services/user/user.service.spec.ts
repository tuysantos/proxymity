import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/model/user.model';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const url = `${environment.endPoint}`;

  const mockResults: User[] = [
    {
      id: 1,
      username: 'test1',
      name: 'Test',
      email: 'test@test.com',
      address: {
        city: 'Berlin',
        street: '123 street name'
      },
    }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return a list of users", () => {
    service.getUsers().subscribe((result: User[]) => {
      expect(result).toEqual(mockResults);
    });

    const req = httpMock.expectOne(`${url}/users`);
    expect(req.request.method).toEqual("GET");
    req.flush(mockResults);
  });
});
