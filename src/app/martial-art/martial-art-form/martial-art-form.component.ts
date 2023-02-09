import { Component } from '@angular/core';
import { MartialArt } from 'src/app/models/martial-art';

@Component({
  selector: 'app-martial-art-form',
  templateUrl: './martial-art-form.component.html',
  styleUrls: ['./martial-art-form.component.css'],
})
export class MartialArtFormComponent {
  protected submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  protected model = new MartialArt('');

  newMartialArt() {
    this.model = new MartialArt('');
  }
}
