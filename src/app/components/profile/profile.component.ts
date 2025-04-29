import {Component, HostListener, Inject, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faInfo} from '@fortawesome/free-solid-svg-icons/faInfo';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {ProfileInfoComponent} from '../profile-info/profile-info.component';
import {Address} from '../../models/address.model';
import {ProfileAddressesComponent} from '../profile-addresses/profile-addresses.component';
import {isPlatformBrowser, NgIf} from '@angular/common';

enum tabs {
  info,
  address
}

@Component({
  selector: 'app-profile',
  imports: [
    FaIconComponent,
    ProfileInfoComponent,
    ProfileAddressesComponent,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected readonly faUser = faUser;
  protected readonly faInfo = faInfo;
  protected readonly faAddressCard = faAddressCard;

  protected readonly tabs = tabs;
  isDesktop = signal(false);
  userService = inject(UserService);
  selectedTab = tabs.info;
  user!: User;
  addresses!: Address[];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if(isPlatformBrowser(this.platformId)) {
      this.isDesktop.update(() => window.screen.width > 1024);
    }
  }

  changeTab(tab: tabs) {
    this.selectedTab = tab;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.isDesktop.update(()=> window.screen.width > 1024);
  }

  ngOnInit() {
    this.isDesktop.update(() => window.screen.width > 1024);
    this.userService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.addresses = data.addresses;
    });
  }


}
