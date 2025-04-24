import {Component, Input} from '@angular/core';
import {Address} from '../../models/address.model';

@Component({
  selector: 'app-profile-addresses',
  imports: [],
  templateUrl: './profile-addresses.component.html',
  styleUrl: './profile-addresses.component.scss'
})
export class ProfileAddressesComponent {
  @Input() addresses: Address[] = [];
}
