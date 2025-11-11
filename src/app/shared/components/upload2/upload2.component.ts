import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/shared/session/services/session.service';

@Component({
    selector: 'app-upload2',
    templateUrl: './upload2.component.html',
    standalone: false
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

    console.log(this.file.name);
    console.log(this.file.size);
    console.log(this.file.type);

    // formData.append(`${this.file.name}`, this.file);
    formData.append('file', this.file);

    console.log('still good here');

    console.log(
      this.httpClient.post(
        'http://localhost:8080/api/students/16/photo',
        formData,
        this.options
      )
    );

    this.httpClient
      .post(
        'http://localhost:8080/api/students/16/photo',
        formData,
        this.options
      )
      .subscribe(
        (data) => {
          console.log('managed to upload');
          console.log(data);
        },
        (error) => {
          console.error('failed to upload');
          console.error(error);
        }
      );
  }
}
