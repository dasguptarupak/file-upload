import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  selectedFile: File = null;
  
  value: number;

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    // console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }

  // Upload with progress tracking
  onUpload() {
    if (this.selectedFile === null) {
      console.log('Choose a file to upload!');
    } else {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.http.post('https://us-central1-udemy-ng-http-a37ab.cloudfunctions.net/uploadFile', formData, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // console.log('Upload Progress >> ', Math.round(event.loaded / event.total * 100) + '%');
            this.value = Math.round(event.loaded / event.total * 100);
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
          }
        });
    }
  }

  ngOnInit() {}
}
