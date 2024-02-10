import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  public generatedOTP!: number
  public enteredOTP!: number
  public mobileNo!: string

  ngOnInit() {
    // this.generateOTP()
  }
  public generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.generatedOTP = Number(OTP);
    console.log(this.generatedOTP);
  }

  phonenumber() {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (this.mobileNo.match(phoneno)) {
      alert('yes')
      return true;
    }
    else {
      alert("no");
      return false;
    }
  }
}
