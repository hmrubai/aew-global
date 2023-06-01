import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { Page } from '../_models/page';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

    @BlockUI() blockUI!: NgBlockUI;
    correctionList: Array<any> = [];

    returnUrl: string;
    currentUser: any = null;
    public user_role = null;
    is_authenticated = false;

    package_image = "assets/img/feature_image.png";
    package_id;

    page = new Page();

    constructor(
        private authService: AuthenticationService,
        private _service: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.page.pageNumber = 0;
        this.page.size = 10;

        if (this.authService.isAuthenticated()) {
            this.currentUser = this.authService.currentUserDetails.value;
            this.user_role = this.currentUser.user_type;
            this.is_authenticated = true;
        }else{
            this.toastr.error('Please, do login first!', 'Attention!');
            this.router.navigate(['/login']);
        }

        if(this.user_role != 'Student'){
            this.toastr.error('You can\'t access student Dashboard!', 'Attention!');
            this.router.navigate(['/']);
        }

        // this.package_id = this.route.snapshot.paramMap.get("id");
        // console.log(this.package_id)
    }

    ngOnInit(): void {
        this.getCorrectionList();
    }

    getCorrectionList() {
        this.blockUI.start('Loading...');
        this._service.get('correction-list').subscribe(res => {
            this.correctionList = res.data;
            // res.data.forEach(item => {
            //     if (!item.feature_image) {
            //         item.feature_image = this.package_image;
            //     } else {
            //         item.feature_image = environment.imageURL + item.feature_image
            //     }
            // });
            this.blockUI.stop();
            //this.toastr.success('Hello world!', 'Toastr fun!');
        }, err => {
            this.blockUI.stop();
        });
    }

    // getPackageList() {
    //     this.blockUI.start('Loading...');
    //     this._service.get('open/package-list').subscribe(res => {
    //         this.correctionList = res.data;
    //         res.data.forEach(item => {
    //             if (!item.feature_image) {
    //                 item.feature_image = this.package_image;
    //             } else {
    //                 item.feature_image = environment.imageURL + item.feature_image
    //             }
    //         });
    //         this.blockUI.stop();
    //         //this.toastr.success('Hello world!', 'Toastr fun!');
    //     }, err => {
    //         this.blockUI.stop();
    //     });
    // }

}
