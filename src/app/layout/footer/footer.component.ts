import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ApiVersionService } from './services/api-version.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  version: string
  apiVersion: string

  constructor(private apiVersionService: ApiVersionService) { }

  ngOnInit() {
    this.version = environment.version;
    this.apiVersionService.getVersion().subscribe((apiVersion: string) => {
      this.apiVersion = apiVersion;
    })
  }

}
