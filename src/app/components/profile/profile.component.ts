import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {faX} from '@fortawesome/free-solid-svg-icons/faX';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-profile',
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected readonly faUser = faUser;
  protected readonly faInfo = faInfo;
  protected readonly faAddressCard = faAddressCard;
  protected readonly faPencil = faPencil;
  protected readonly faSave = faSave;
  protected readonly faX = faX;

  userService = inject(UserService);

  user: User | null = null;
  profileEditMode: boolean = false;

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
    });
  }

  toggleProfileEditMode() {
    this.profileEditMode = !this.profileEditMode;
  }
}
