import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { signal } from '@angular/core';
import { DndDirective } from '../../../common-ui/directives/dnd.directive';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { effect } from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  imports: [IconComponent, DndDirective, FormsModule],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  profileService = inject(ProfileService);
  me = this.profileService.me;

  accountAvatar = '/assets/images/Content.png';
  preview = signal<string>(this.accountAvatar);

  constructor() {
    effect(() => {
      const userData = this.profileService.me();

      if (userData?.avatarUrl) {
        this.accountAvatar =
          'https://icherniakov.ru/yt-course/' + userData.avatarUrl.toString();
        this.preview.set(this.accountAvatar);
        console.log('preview url:', this.accountAvatar);
      } else {
        console.log('типа нет');

        this.accountAvatar = '/assets/images/Content.png';
        this.preview.set(this.accountAvatar);
      }
    });
  }

  avatar: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.proccessFile(file);
  }

  onFileDroped(file: File) {
    this.proccessFile(file);
  }

  proccessFile(file: File | null | undefined) {
    if (!file || !file.type.match('image')) return;
    this.avatar = file;

    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
  }
}
