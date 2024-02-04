import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycComponent } from './kyc/kyc.component';
import { VideoComponent } from './kyc/video/video.component';
import { OtpComponent } from './kyc/otp/otp.component';
import { PasswordComponent } from './kyc/password/password.component';

const routes: Routes = [
  {
    path: '', component: KycComponent, children: [
      { path: '', redirectTo: 'video', pathMatch: 'full' },
      { path: 'video', component: VideoComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'password', component: PasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
