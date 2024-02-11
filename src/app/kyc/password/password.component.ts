import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {

  public password: string = ''
  public confirmPassword: string = ''
  public passwordType: boolean = true
  public confirmPasswordType: boolean = true
  public passwordValid: Record<string, boolean> = {
    upper: false,
    lower: false,
    number: false,
    special: false
  }
  public verfied!: boolean

  public continue(): void {
    if (this.password != this.confirmPassword || this.password == '' || this.confirmPassword == '') {
      alert('passowrd doesnt matched')
      this.verfied = false
    } else {
      this.verfied = true
    }
  }

  public toggleType(type: 'password' | 'confirm') {
    type == 'password' ? this.passwordType = !this.passwordType : this.passwordType
    type == 'confirm' ? this.confirmPasswordType = !this.confirmPasswordType : this.confirmPasswordType
  }

  public validPassword(): void {
    const upperRegex = /[A-Z]/
    const lowerRegex = /[a-z]/
    const numberRegex = /[0-9]/
    const specialRegex = /[#?!@$ %^&*-/+_=`~|:;.,<>(){}"']/

    this.passwordValid['upper'] = upperRegex.test(this.password)
    this.passwordValid['lower'] = lowerRegex.test(this.password)
    this.passwordValid['number'] = numberRegex.test(this.password)
    this.passwordValid['special'] = specialRegex.test(this.password)    
  }

}
