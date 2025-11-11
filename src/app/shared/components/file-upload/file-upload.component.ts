import { Component } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    standalone: false
})
export class FileUploadComponent {
  fileToUpload?: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    const asdf: Event = new Event('file');
  }

  handleEventTarget(target: EventTarget | null) {
    this.fileToUpload = (target as HTMLInputElement).files?.item(0);

    this.uploadFileToActivity();
  }

  constructor(private readonly fileUploadService: FileUploadService) {}

  uploadFileToActivity() {
    const token =
      /* jQuery("meta[name='_csrf']").attr('content')!; */
      document.getElementsByName('_csrf')[0].getAttribute('content')!;

    const header =
      /* jQuery("meta[name='_csrf_header']").attr('content')!; */
      document.getElementsByName('_csrf_header')[0].getAttribute('content')!;

    console.log('header : ', header);
    console.log('token : ', token);

    const csrfToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    console.log('csrfToken : ', csrfToken);

    this.fileUploadService
      .postFile(header, token, csrfToken, this.fileToUpload)
      .subscribe(
        (data) => {
          // actions to perform if upload succeeds
          console.log('succeeded finally!!!');
        },
        (error) => {
          console.error(error);
        }
      );
  }

  log2(e: Event) {
    console.log(e);

    console.log(e.srcElement);
    console.log(e.srcElement as HTMLInputElement);
    console.log((e.srcElement as HTMLInputElement).files);
    console.log((e.srcElement as HTMLInputElement).files?.item);
    console.log((e.srcElement as HTMLInputElement).files?.item(0));

    console.log(e.target);
    console.log(e.target as HTMLInputElement);
    console.log((e.target as HTMLInputElement).files);
    console.log((e.target as HTMLInputElement).files?.item);
    console.log((e.target as HTMLInputElement).files?.item(0));
  }
}
