import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  userForm! : FormGroup;
  error_messages: any;
  addEdit = 'Add User';
  userId = 0;
  addUppDate = 'Add';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.error_messages = this.loadErrors();
    this.setupForm();
    this.userId = this.route.snapshot.params['id'];

    if (this.userId) {
      this.addUppDate = 'Update';
      this.addEdit = 'Edit user';
      const user = this.userService.getUserById(this.userId);
      if(user) {
        this.userForm.patchValue(user);
        this.userForm.get('city')?.setValue(user.address.city);
        this.userForm.get('street')?.setValue(user.address.street);
      }
      
    }
  }

  setupForm(): void {
    this.userForm = this.formBuilder.group({
      id: new FormControl(0,Validators.compose([
        Validators.required,
    ])),
        name: new FormControl('',Validators.compose([
            Validators.required,
        ])),
        username: new FormControl('',Validators.compose([
            Validators.required,
        ])),
        email: new FormControl('',Validators.compose([
            Validators.required,
            Validators.email
        ])),
        street: new FormControl('',Validators.compose([
          Validators.required,
      ])),
      city: new FormControl('',Validators.compose([
        Validators.required,
    ])),
        
    });
  }

  loadErrors(): any {
    return {
        'name':[
            { type:'required', message: 'Name is required'},
        ],
        'username':[
            { type:'required', message: 'user name is required'},
        ],
        'email':[
            { type:'required', message: 'email is required'},
            { type:'email', message: 'invalid email'},
        ],
        'street':[
            { type:'required', message: 'email is required'}, 
        ],
        'city':[
          { type:'required', message: 'email is required'}, 
      ],
    }
  }

  saveData() {
    console.log('saving...')

    if(this.userForm.valid) {
      const user: User = {
        id: this.userId ? this.userId : 0,
        name: this.userForm.get('name')?.value,
        username: this.userForm.get('username')?.value,
        email: this.userForm.get('email')?.value,
        address: {
          street: this.userForm.get('street')?.value,
          city: this.userForm.get('city')?.value,
        }
    }
    this.userId ? this.userService.updateUser(user) : this.userService.addUser(user);
    this.router.navigate(['main'])

  } else {
      this.userForm.markAllAsTouched();
  }
  }
}
