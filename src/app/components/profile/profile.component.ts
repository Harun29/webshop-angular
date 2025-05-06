import { Component, HostListener, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faInfo } from '@fortawesome/free-solid-svg-icons/faInfo';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons/faAddressCard';
import { UserDto } from '../../models/user.model';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { Address } from '../../models/address.model';
import { ProfileAddressesComponent } from '../profile-addresses/profile-addresses.component';
import {CommonModule, isPlatformBrowser, NgIf} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket';

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
    NgIf,
    CommonModule
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
  authService = inject(AuthService);
  selectedTab = tabs.info;
  user!: UserDto;
  addresses: Address[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: Router, private userService: UserService) {
    if (isPlatformBrowser(this.platformId)) {
      this.isDesktop.update(() => window.screen.width > 1024);
    }
  }

  changeTab(tab: tabs) {
    this.selectedTab = tab;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.isDesktop.update(() => window.screen.width > 1024);
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
        this.addresses = user.addresses ?? [];
        console.log('User data loaded from API:', this.user);
      },
      error: () => {
        this.route.navigateByUrl('/login');
      }
    });
  }

  onUserUpdated(updatedUser: UserDto) {
    this.user = { ...updatedUser };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }

  logout() {
    this.authService.logout();
  }

  protected readonly faRightFromBracket = faRightFromBracket;
}
