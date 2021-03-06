import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  password = '';
  email = '';

  constructor(private authService: AuthService,
              private messageService: MessageService
  ) {}

  submit(): void {

    if (!/^.+\@.+\..+$/.test(this.email)) {
      this.messageService.alert(`Email muss korrekt ausgefüllt sein.`);
      return;
    }
    if (!this.password) {
      this.messageService.alert(`Passwort muss korrekt ausgefüllt sein.`);
      return;
    }

    // send login data to backend
    this.authService.login({email: this.email, password: this.password, name: null});
  }

  forgotPassword() {
    this.authService.resetPassword(this.email);
  }
}
