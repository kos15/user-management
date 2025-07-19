import { Component, input, InputSignal, output } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  language: string;
  bio: string;
  version: number;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrls: ['./user-details.scss'],
  standalone: true
})
export class UserDetailsComponent {
  user: InputSignal<User | undefined> = input();
  close = output<boolean>();
  pairs: [string, unknown][] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.pairs = this.user() ? Object.entries(this.user) : [];
  }

  navigateBack() {
    this.close.emit(true);
  }
}
