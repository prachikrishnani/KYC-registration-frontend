import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KycComponent } from './kyc/kyc.component';
import { VideoComponent } from './kyc/video/video.component';
import { OtpComponent } from './kyc/otp/otp.component';
import { PasswordComponent } from './kyc/password/password.component';

import { PrimengModule } from "./primeng/primeng.module";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AppComponent,
    KycComponent,
    VideoComponent,
    OtpComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    CountdownModule,
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
