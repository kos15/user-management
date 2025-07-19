import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private dataUrl = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';

  usersSignal = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchUsers() {
    from(this.http.get<any[]>(this.dataUrl)).subscribe({
      next: (users) => this.usersSignal.set(users)
    });
  }
}
