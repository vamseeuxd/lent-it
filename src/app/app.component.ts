import { Observable, tap } from 'rxjs';
import { LoaderService } from './loader.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // initLoader: number;
  user$: Observable<firebase.User | null> = this.auth.user;
  constructor(
    public loaderService: LoaderService,
    public auth: AngularFireAuth,
    private route: Router
  ) {}
  async login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    if (confirm('Are you sure!Do you want to Logout?')) {
      const loader = this.loaderService.show();
      this.auth.signOut();
      this.route.navigate(['books'])
      this.loaderService.hide(loader);
    }
  }
}
