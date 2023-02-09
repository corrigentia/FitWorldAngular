import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MartialArt } from 'src/app/models/martial-art';

@Component({
  selector: 'app-martial-art-form-reactive',
  templateUrl: './martial-art-form-reactive.component.html',
  styleUrls: ['./martial-art-form-reactive.component.css'],
})
export class MartialArtFormReactiveComponent implements OnInit {
  martialArt = new MartialArt('');

  private martialArtForm!: FormGroup;

  ngOnInit(): void {
    this.martialArtForm = new FormGroup({
      name: new FormControl(this.martialArt.name, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(42),
        // forbiddenNameValidator(/bob/i), // <-- Here's how you pass in the custom validator.
      ]),
      // lastName: ...
    });
  }

  get name() {
    return this.martialArtForm.get('name');
  }
}
