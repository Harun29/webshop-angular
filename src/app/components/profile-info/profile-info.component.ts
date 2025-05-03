import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {UserDto} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPencil, faSave, faX} from '@fortawesome/free-solid-svg-icons';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [
    FaIconComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnChanges{
  protected readonly faX = faX;
  protected readonly faSave = faSave;
  protected readonly faPencil = faPencil;

  profileEditMode: boolean = false;
  errorMessage: string | null = null;

  @Input() user!: UserDto;
  @Output() userUpdated = new EventEmitter<UserDto>();

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      console.log('User input changed:', this.user);
    }
  }

  toggleProfileEditMode() {
    this.profileEditMode = !this.profileEditMode;
  }

  saveProfileChanges() {
    if (this.user && this.user.id) {
      this.user.firstName = this.user.firstName?.trim() || this.user.firstName;
      this.user.lastName = this.user.lastName?.trim() || this.user.lastName;

      this.userService.updateUser(this.user.id, this.user).subscribe({
        next: (updatedUser) => {
          console.log('Profile updated successfully', updatedUser);
          this.toggleProfileEditMode();
          this.errorMessage = null;
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.userUpdated.emit(updatedUser);
          this.user = updatedUser;
        },
        error: (error) => {
          console.error('Error updating profile', error);
          this.errorMessage = this.extractErrorMessage(error);
        },
        complete: () => {
          console.log('Profile update process completed');
        }
      });
    }
  }


  extractErrorMessage(error: any): string {
    if (error && error.error && error.error.details) {
      return Object.values(error.error.details)[0] as string;
    }
    return 'An unknown error occurred. Please try again later.';
  }

}
