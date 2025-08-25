import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileService } from './data/services/profile.service';
import { CommonModule } from '@angular/common';
import { Profile } from './data/interface/profile-interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'nik-talk';
  profileService = inject(ProfileService);

  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccount().subscribe((val) => {
      this.profiles = val;
    });
  }
}
