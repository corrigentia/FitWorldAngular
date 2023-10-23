import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/shared/session/services/session.service';

@Component({
  selector: 'app-upload2',
  templateUrl: './upload2.component.html',
  // styleUrls: ['./upload2.component.css'],
})
export class Upload2Component {
  constructor(
    private readonly _sessionService: SessionService,
    private readonly httpClient: HttpClient
  ) {}
  file!: File;
  private options = {
    headers: new HttpHeaders().set(
      'Authorization',
      this._sessionService.data?.token!
    ),
  };

  onFileSelected(event: Event) {
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if (input.files) {
      this.file = input.files[0];
    }
  }

  uploadFile() {
    const formData: FormData = new FormData();
    console.log(this.file);

    formData.append('file', this.file);

    console.log('still good here');

    this.httpClient
      .post('http://localhost:8080/api/upload', formData, this.options)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
