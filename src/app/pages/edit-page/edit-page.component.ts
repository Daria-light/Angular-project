import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    AvatarUploadComponent,
  ],

  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  fb = inject(FormBuilder);
  porfileService = inject(ProfileService);

  tagSet!: string;
  tags: string[] = [];

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  onTagsetKeyDown(event: Event) {
    if (event) event.preventDefault();
    if (this.tagSet == '' || this.tagSet == null) return;
    if (this.tags.includes(this.tagSet.toLowerCase())) {
      return (this.tagSet = '');
    }

    this.tags.push(this.tagSet.toLowerCase());
    this.tagSet = '';
    return;
  }

  tagDelete(tag: string) {
    this.tags = this.tags.filter((item) => item !== tag);
  }

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.porfileService.me(),
        //@ts-ignore
        stack: this.mergeStack(this.porfileService.me()?.stack),
      });

      if (this.porfileService.me()?.stack) {
        //@ts-ignore
        this.tags = this.porfileService.me()?.stack;
      }

      if (this.tagSet) {
        this.tagSet = '';
      }
      console.log();
    });
  }

  onDel() {
    this.form.clearAsyncValidators();
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        this.porfileService.uploadAvatar(this.avatarUploader.avatar)
      );
    }

    // @ts-ignore
    firstValueFrom(
      //@ts-ignore
      this.porfileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.tags),
      })
    );
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (!stack) return [];

    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return '';

    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
