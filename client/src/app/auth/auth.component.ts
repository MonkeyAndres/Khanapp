import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  operation: string;
  inverseOperation: string;
  message: string;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {
    this.operation = this.router.url.replace('/', '');
    this.inverseOperation = this.operation === 'login' ? 'signup' : 'login';

    if (this.operation === 'login') {
      this.message = 'You don\'t';
    } else { this.message = 'Already'; }
  }

  onSubmit(form: NgForm) {
    if (this.operation === 'login') {
      this.auth.login(form.value).subscribe(() => this.router.navigate(['/profile']));
    } else {
      this.auth.signup(form.value).subscribe(() => this.router.navigate(['/profile']));
    }
  }

  changeForm(event) {
    event.preventDefault();
    this.router.navigate([`/${this.inverseOperation}`]);
  }
}
