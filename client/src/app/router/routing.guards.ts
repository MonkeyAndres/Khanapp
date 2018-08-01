import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class UserLogged implements CanActivate {

  constructor(public authService: AuthService) { }

  canActivate(): boolean {
    return this.authService.user ===  undefined;
  }
}

@Injectable()
export class UserNotLogged implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {
    this.router.navigate(['/profile']);
    return this.authService.user !==  undefined;
  }
}
