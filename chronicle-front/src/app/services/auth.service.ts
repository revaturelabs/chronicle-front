import {Injectable, NgZone} from '@angular/core';
import {Observable}         from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router}           from '@angular/router';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  }
