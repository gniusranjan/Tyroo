import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthGuard} from './auth/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app.routing';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';

import { LoginService } from './login/login.service';
import { RulesService } from './rules/rules.service';

import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers:[ AuthGuard, LoginService, RulesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
