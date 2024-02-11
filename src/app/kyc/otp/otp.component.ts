import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgOtpInputConfig } from 'ng-otp-input';
import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public generatedOTP!: string
  public enteredOTP: string=''
  public mobileNo!: string
  public invalidNumber = false
  public resendOtpButtonState: boolean = true;
  public resendOtpCount: number = 0;
  public nextStepIn: number = 5

  @ViewChild('ngOtpInput') public ngOtpInput: any;
  @ViewChild('resendOTP', { static: false }) private resendOTP!: CountdownComponent;

  // Config to start the counter once otp success from server
  public countDownConfig: CountdownConfig = {
    demand: true,
    leftTime: 300,
    format: 'm:s'
  };

  // Initial config for resend otp
  public resendcountDownConfig: CountdownConfig = {
    demand: true,
    leftTime: 120,
    format: 'm:s'
  };

  // OTP configuration which are used at the frontend
  public otpConfig: NgOtpInputConfig = {
    length: 6,
    inputStyles: {
      'width': '40px',
      'height': '40px'
    },
    allowNumbersOnly: true,
    disableAutoFocus: true,
  };

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.generateOTP()
  }
  public generateOTP() {
    if (!this.invalidNumber) {
      let digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      this.generatedOTP = OTP;
      this._handleDiv('mobile', 'none');
      this._handleDiv('otp', 'flex');
      this._handleAddClass('otp', 'fade-in-right');
      this.startCountdown();
    }
  }

  phonenumber() {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (this.mobileNo.match(phoneno)) {
      this.invalidNumber = false
      return true;
    }
    else {
      this.invalidNumber = true
      return false;
    }
  }

  /**
 * this function is used to start the otp Countdown 
 */
  public startCountdown(): void {
    // this.otpCountdown.begin();
    // this.resendOTP.begin();
    this.resendOTP.restart()
    this.resendOTP.begin();

  }

  public onOtpChange(event: string): void {
    this.enteredOTP = event;
    this.verifyOtp()
  }

  public handleOTPExpireEvent(event: CountdownEvent): void {
  }

  /**
 * this function is used to enable resend otp button
 * @param event 
 */
  public handleResendOTPTimerEvent(event: CountdownEvent) {
    event.action == 'done' ? this.resendOtpButtonState = false : this.resendOtpButtonState = true;
  }

  /**
   * if user hit resend otp new otp will send to their email using api 
   */
  public resendOtp(): void {
    if (this.resendOtpButtonState == false && this.resendOtpCount < 2) {
      this.resendOtpCount += 1
      this.ngOtpInput.setValue('')
      this.generateOTP()
      this.resendOTP.restart()
      this.startCountdown()
    }
  }

  /**
 * this function is used to verify otp using api 
 * if otp is valid _changeRoute function is call
 */
  public verifyOtp(): void {
    if (this.enteredOTP.length == 6) {
      this._handleDiv('verifyBtn', 'none')
      if (this.generatedOTP == this.enteredOTP) {
        let next = setInterval(() => {
          if (this.nextStepIn === 0) {
            clearInterval(next)
            this._router.navigate(['../password'], {
              relativeTo: this._route
            })
          } else {
            this.nextStepIn--
          }
        }, 1000)

      } else {
        this._handleDiv('verifyBtn', 'block')
      }
    }
  }

  public back(): void {
    this.ngOtpInput.setValue('')
    this._handleDiv('otp', 'none');
    this._handleDiv('mobile', 'flex');
    this._handleAddClass('mobile', 'fade-in-left');
  }

  private _handleDiv(divId: string, displayType: string): void {
    (<HTMLDivElement>document.getElementById(divId)).style.display = displayType;
  }

  private _handleAddClass(divId: string, className: string): void {
    (<HTMLDivElement>document.getElementById(divId)).classList.add(className);
  }

}
