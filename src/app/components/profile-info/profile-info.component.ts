import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgIf} from "@angular/common";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import {faPencil} from "@fortawesome/free-solid-svg-icons/faPencil";
import {User} from '../../models/user.model';

@Component({
  selector: 'app-profile-info',
    imports: [
        FaIconComponent,
        NgIf
    ],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent {

    protected readonly faX = faX;
    protected readonly faSave = faSave;
    protected readonly faPencil = faPencil;

    profileEditMode: boolean = false;

    toggleProfileEditMode() {
      this.profileEditMode = !this.profileEditMode;
    }

    @Input() user!: User;
}
