import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// If user logged Allow Access, else go to login
@Injectable()
export class UserLogged implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLogged().pipe(
      map(data =>  true),
      catchError(err => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

// If user not logged Allow Access, else go to profile
@Injectable()
export class CanLogin implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLogged().pipe(
      map(data => {
        this.router.navigate(['/profile']);
        return false;
      }),
      catchError(err => of(true))
    );
  }
}
