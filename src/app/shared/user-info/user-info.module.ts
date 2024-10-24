import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserInfoComponent } from './user-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserInfoComponent],
  exports: [UserInfoComponent],
})
export class UserInfoModule {}
