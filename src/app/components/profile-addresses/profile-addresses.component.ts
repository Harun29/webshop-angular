import { Component, Input, signal } from '@angular/core';
import { Address } from '../../models/address.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faX } from '@fortawesome/free-solid-svg-icons/faX';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { AddressService } from '../../services/address.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-addresses',
  imports: [FaIconComponent, NgIf, FormsModule, CommonModule],
  templateUrl: './profile-addresses.component.html',
  styleUrls: ['./profile-addresses.component.scss'],
})
export class ProfileAddressesComponent {
  @Input() addresses: Address[] = [];
  protected editToggled = signal(false);
  protected addressToEdit = signal<Address | null>(null);
  protected addAddressToggled = signal(false);

  protected errorMessage: string | null = null;

  addressForm: Address = {
    id: 0,
    street: '',
    postalCode: '',
    city: '',
    country: '',
  };

  constructor(private addressService: AddressService) {}

  protected toggleEdit() {
    this.addAddressToggled.set(false);
    this.editToggled.set(!this.editToggled());
  }

  protected toggleAddAddress() {
    this.editToggled.set(false);
    this.addAddressToggled.set(!this.addAddressToggled());
  }

  protected editAddress(address: Address) {
    this.addressToEdit.set(address);
    this.addressForm = { ...address };
    this.toggleEdit();
  }

  protected saveAddress(form: Address): void {
    if (form && form.street && form.postalCode && form.city && form.country) {
      const addressToSave = { ...form };
      this.addressService.saveAddress(addressToSave).subscribe({
        next: (savedAddress) => {
          this.toggleEdit();
          const index = this.addresses.findIndex(address => address.id === savedAddress.id);
          if (index > -1) {
            this.addresses[index] = savedAddress;
          } else {
            this.addresses.push(savedAddress);
          }
          this.addressForm = { id: 0, street: '', postalCode: '', city: '', country: '' };
          this.toggleAddAddress();
          this.addAddressToggled.set(false);
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.error('Error saving address:', err);
        },
        complete: () => {
          console.log('Save address request completed.');
        },
      });
    }
  }

  protected deleteAddress(address: Address | null): void {
    if (address) {
      this.addressService.deleteAddress(address.id).subscribe({
        next: () => {
          this.addresses = this.addresses.filter(addr => addr.id !== address.id);
          this.toggleEdit();
        },
        error: (err) => {
          this.errorMessage = err.message;
          console.error('Error deleting address:', err);
        },
        complete: () => {
          console.log('Delete address request completed.');
        },
      });
    }
  }

  trackById(index: number, address: Address): number {
    return address.id;
  }


  protected readonly faPlus = faPlus;
  protected readonly faX = faX;
  protected readonly faSave = faSave;
  protected readonly faEdit = faEdit;
  protected readonly faTrash = faTrash;
}
