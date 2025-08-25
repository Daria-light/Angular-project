import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Profile } from '../../data/interface/profile-interface';
import { CommonModule } from '@angular/common';

import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [CommonModule, ImgUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;
}
