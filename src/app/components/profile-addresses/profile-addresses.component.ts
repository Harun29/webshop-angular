import {Component, Input, signal} from '@angular/core';
import {Address} from '../../models/address.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {faX} from '@fortawesome/free-solid-svg-icons/faX';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';

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
  protected editToggled = signal(false);
  protected addressToEdit = signal<Address | null>(null);
  protected addAddressToggled = signal(false);

  protected toggleEdit() {
    this.editToggled.set(!this.editToggled());
  }

  protected toggleAddAddress() {
    this.addAddressToggled.set(!this.addAddressToggled());
  }

  protected editAddress(address: Address) {
    this.addressToEdit.set(address);
    this.toggleEdit();
  }

  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
  protected readonly faSave = faSave;
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
}
