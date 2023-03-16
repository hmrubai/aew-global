import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  packageList: Array<any> = [];

  constructor(
    private _service: CommonService,
    private toastr: ToastrService
  ){ 

  }

  ngOnInit(): void {
    this.getPackageList();
  }

  getPackageList(){
    this.blockUI.start('Loading...');
    this._service.get('open/package-list').subscribe(res => {
      console.log(res)
      this.blockUI.stop();
      this.toastr.success('Hello world!', 'Toastr fun!');
  }, err => { 
      this.blockUI.stop();
  });
  }

}
