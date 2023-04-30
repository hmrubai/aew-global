import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

    @BlockUI() blockUI!: NgBlockUI;
    packageList: Array<any> = [];

    package_image = "assets/img/feature_image.png";
    package_id;

    constructor(
        private _service: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        // this.package_id = this.route.snapshot.paramMap.get("id");
        // console.log(this.package_id)
    }

    ngOnInit(): void {
        this.getPackageList();
    }

    getPackageList() {
        this.blockUI.start('Loading...');
        this._service.get('open/package-list').subscribe(res => {
            this.packageList = res.data;
            res.data.forEach(item => {
                if (!item.feature_image) {
                    item.feature_image = this.package_image;
                } else {
                    item.feature_image = environment.imageURL + item.feature_image
                }
            });
            this.blockUI.stop();
            //this.toastr.success('Hello world!', 'Toastr fun!');
        }, err => {
            this.blockUI.stop();
        });
    }

}
