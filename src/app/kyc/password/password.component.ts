import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  public password: string=''
  public confirmPassword: string=''

  public continue(): void {
    if (this.password != this.confirmPassword || this.password =='' || this.confirmPassword =='') {
      alert('passowrd doesnt matched')
    }
  }
}
