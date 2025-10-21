import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interface/profile-interface';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { CommonModule } from '@angular/common';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  imports: [
    RouterOutlet,
    ProfileCardComponent,
    CommonModule,
    ProfileFiltersComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  title = 'nik-talk';
  profileService = inject(ProfileService);

  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccount().subscribe((val) => {
      this.profiles = val;
    });
  }
}
