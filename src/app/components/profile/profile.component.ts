import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {faX} from '@fortawesome/free-solid-svg-icons/faX';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  protected readonly faUser = faUser;
  protected readonly faInfo = faInfo;
  protected readonly faAddressCard = faAddressCard;
  protected readonly faPencil = faPencil;

  profileEditMode: boolean = false;

  toggleProfileEditMode() {
    this.profileEditMode = !this.profileEditMode;
  }


  protected readonly faSave = faSave;
  protected readonly faX = faX;
}
