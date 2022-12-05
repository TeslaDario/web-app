import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  declarations: [LoginComponent],
})
export class AuthModule {}
