import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent {


  public currentStep = 1

  constructor(
    private _router: Router
  ) {
    this.checkCurrentStep()
  }

  public changeStep(step: 1 | 2 | 3, routeTo: 'video' | 'otp' | 'password'): void {
    this.currentStep = step
    this._router.navigate([routeTo])
  }

  public checkCurrentStep(): void {
    if (this._router.url.includes('video')) {
      this.currentStep = 1
    } else if (this._router.url.includes('otp')) {
      this.currentStep = 2
    } else if (this._router.url.includes('password')) {
      this.currentStep = 3
    }
  }
}
