import { Component, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { IconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { RouterLink } from '@angular/router';
import { SubscriberCardComponent } from '../../common-ui/sidebar/subscriber-card/subscriber-card.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    CommonModule,
    AsyncPipe,
    IconComponent,
    RouterLink,
    SubscriberCardComponent,
    ImgUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShotList(5);

  route = inject(ActivatedRoute);

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  me$ = toObservable(this.profileService.me);

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.profileService.getMe();
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
