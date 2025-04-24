import {Component, Input} from '@angular/core';
import {Address} from '../../models/address.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';

@Component({
  selector: 'app-profile-addresses',
  imports: [
    FaIconComponent
  ],
  templateUrl: './profile-addresses.component.html',
  styleUrl: './profile-addresses.component.scss'
})
export class ProfileAddressesComponent {
  @Input() addresses: Address[] = [];
  protected readonly faPlus = faPlus;
}
