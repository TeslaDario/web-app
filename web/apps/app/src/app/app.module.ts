import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from '@app/core/auth';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutes, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
