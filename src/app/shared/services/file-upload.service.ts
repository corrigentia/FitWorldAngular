import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private readonly httpClient: HttpClient) {}

  postFile(
    header: string,
    token: string,
    csrfToken: string,
    fileToUpload?: File | null
  ) {
    console.log('fileToUpload : ', fileToUpload);
    console.log('fileToUpload as File : ', fileToUpload as File);
    console.log('fileToUpload.name : ', fileToUpload?.name);
    const id = 16;
    const endPoint = `http://localhost:8080/api/students/${id}/photo`;

    const formData = new FormData();
    /*
    formData.append(
      `photoStudent${id}`,
      fileToUpload as File,
      fileToUpload?.name
    );
    */

    // formData.append('somenamehere', fileToUpload as File);

    // formData.append('thename', 'thevalue');

    formData.append('file', fileToUpload as File);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    headers.append('Access-Control-Allow-Credentials', 'true');
    const options = { headers: headers };

    console.log('formData : \n', formData);

    const definiteHeader = (header as string)!;

    console.log('csrfToken : ', csrfToken);

    return this.httpClient.post(
      'http://localhost:8080/api/upload',
      {
        name: 'asdfadsfasdf',
        file: formData,
      },
      options
    );

    return this.httpClient.post(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': 'http://localhost:8080/api/upload',
        header: token,
        'X-XSRF-TOKEN': csrfToken,
      },
    });
  }
}
