import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, UserDetailsComponent] // Add needed modules and features
})
export class UserListComponent implements OnInit {
  public userService = inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  users = this.userService.usersSignal;
  formSignals: any = {};
  editingIdx = signal<number | null>(null);
  public isDetailsVisible = signal(false);
  public isEditingInProgress = signal(false);
  public userToBeDisplayed = signal(null);

  constructor() {}

  ngOnInit() {
    this.userService.fetchUsers();
  }

  getKeys() {
    return this.users().length ? Object.keys(this.users()[0]) : [];
  }

  startEdit(idx: number) {
    this.isEditingInProgress.set(true);
    const user = this.users()[idx];
    this.formSignals[idx] = this.fb.group({ ...user });
    this.editingIdx.set(idx);
  }

  saveEdit(idx: number) {
    const newUser = this.formSignals[idx].value;
    const updated = [...this.users()];
    updated[idx] = newUser;
    this.userService.usersSignal.set(updated);
    this.editingIdx.set(null);
    this.isEditingInProgress.set(false);
  }

  viewDetails(user: any) {
    if(this.isEditingInProgress()) {
      return;
    }
    this.isDetailsVisible.set(true);
    this.userToBeDisplayed.set(user);
  }
}
