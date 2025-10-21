import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../../data/services/profile.service';
import { AvatarUploadComponent } from '../../edit-page/avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

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

  onDel() {
    this.form.clearAsyncValidators();
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

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
