import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom, tap } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  imports: [ProfileHeaderComponent, ReactiveFormsModule],

  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent {
  fb = inject(FormBuilder);
  porfileService = inject(ProfileService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    desctiption: [''],
    stack: [''],
  });

  constructor() {
    let me = this.porfileService.getMe().subscribe();
    console.log(this.porfileService.me());

    effect(() => {
      if (!!this.porfileService.me()) {
        console.log(this.porfileService.me());
        console.log('it issss ', me);
        this.form.patchValue({
          //@ts-ignore
          username: this.porfileService.me().username,

          // username: me.username,
        });
      }
    });
    // console.log(!!this.porfileService.me);
  }

  onSave() {}
}
