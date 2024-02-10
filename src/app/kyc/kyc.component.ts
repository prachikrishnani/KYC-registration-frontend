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
  }

  public changeStep(step: 1 | 2 | 3, routeTo: 'video' | 'otp' | 'password'): void {
    this.currentStep = step
    this._router.navigate([routeTo])
  }
}
