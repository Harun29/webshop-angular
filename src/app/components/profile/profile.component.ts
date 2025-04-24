import {Component, inject, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {NgIf} from '@angular/common';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {ProfileInfoComponent} from '../profile-info/profile-info.component';
import {Address} from '../../models/address.model';
import {ProfileAddressesComponent} from '../profile-addresses/profile-addresses.component';

enum tabs {
  info,
  address
}

@Component({
  selector: 'app-profile',
  imports: [
    FaIconComponent,
    ProfileInfoComponent,
    ProfileAddressesComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected readonly faUser = faUser;
  protected readonly faInfo = faInfo;
  protected readonly faAddressCard = faAddressCard;

  protected readonly tabs = tabs;

  userService = inject(UserService);
  selectedTab = tabs.info;

  user!: User;
  addresses!: Address[];

  changeTab(tab: tabs) {
    this.selectedTab = tab;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.addresses = data.addresses;
    });
  }


}
