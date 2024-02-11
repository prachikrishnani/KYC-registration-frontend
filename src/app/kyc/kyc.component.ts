import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent {


  public currentStep!: number

  constructor(
    private _router: Router
  ) {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.checkCurrentStep(event.url)
      }
    });
    this.checkCurrentStep(_router.url)
  }

  public changeStep(step: 1 | 2 | 3, routeTo: 'video' | 'otp' | 'password'): void {
    this.currentStep = step
    this._router.navigate([routeTo])
  }

  public checkCurrentStep(url: string): void {
    if (url.includes('video')) {
      this.currentStep = 1
    } else if (url.includes('otp')) {
      this.currentStep = 2
    } else if (url.includes('password')) {
      this.currentStep = 3
    }
  }
}
