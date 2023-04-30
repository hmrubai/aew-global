import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonService } from '../_services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-package-details',
    templateUrl: './package-details.component.html',
    styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

    @BlockUI() blockUI!: NgBlockUI;
    package_id;
    is_loaded = false;
    package_image = "assets/img/feature_image.png";

    packageDetails: any = null;
    syllebusList: Array<any> = [];

    constructor(
        private _service: CommonService,
        //private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.package_id = this.route.snapshot.paramMap.get("id");
        console.log(this.package_id)
    }

    ngOnInit(): void {
        this.getPackageiDetails();
        this.getSyllabusList();
    }

    getPackageiDetails() {
        this.blockUI.start('Loading...');
        this._service.get('open/package-details-by-id/' + this.package_id).subscribe(res => {
            this.packageDetails = res.data;
            if(!res.data.feature_image){
                this.package_image = res.data.feature_image;
            }
            this.is_loaded = true;
            this.blockUI.stop();
            //this.toastr.success('Hello world!', 'Toastr fun!');
        }, err => {
            this.blockUI.stop();
        });
    }

    getSyllabusList() {
        this.blockUI.start('Loading...');
        this._service.get('open/syllabus-list').subscribe(res => {
            this.syllebusList = res.data;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
    }

}
