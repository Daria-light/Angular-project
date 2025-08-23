import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-profile-tags',
  imports: [],
  templateUrl: './profile-tags.component.html',
  styleUrl: './profile-tags.component.scss',
})
export class ProfileTagsComponent {
  @Input() tags: string[] = []; // Массив тегов
}
export class MyComponent {
  programmingLanguages: string[] = [
    'JavaScript',
    'TypeScript',
    'Angular',
    'HTML',
    'CSS',
  ];
}
