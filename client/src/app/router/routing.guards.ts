import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * If you don't understand something see the rxjs docs
*/

// If user logged Allow Access, else go to login
@Injectable()
export class UserLogged implements CanActivate {

  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): Observable<boolean> { // This route guard returns an observable with boolean
    return this.authService.isLogged().pipe(
      map(data =>  true), // If exist the user = return true
      catchError(err => { // Else go to profile and return false
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

  canActivate(): Observable<boolean> { // This route guard returns an observable with boolean
    return this.authService.isLogged().pipe(
      map(data => { // If user exist go to profile and return false
        this.router.navigate(['/profile']);
        return false;
      }),
      catchError(err => of(true)) // Else return true
    );
  }
}
