import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    entryForm: FormGroup;
    submitted = false;
    returnUrl: string;

    @BlockUI() blockUI!: NgBlockUI;
    packageList: Array<any> = [];

    package_image = "assets/img/feature_image.png";
    package_id;

    constructor(
        private _service: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        public formBuilder: FormBuilder,
        private router: Router,
    ) {
        
    }

    ngOnInit(): void {
        this.entryForm = this.formBuilder.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.authService.isAuthenticated()) {
            this.router.navigate([this.returnUrl ? this.returnUrl : '/dashboard']);
        }
    }

    get f() {
        return this.entryForm.controls;
    }

    onLoginSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }
        this.blockUI.start('Loading...');

        this.authService.login(this.entryForm.value).subscribe(
            data => {
                if (data.status === 400) {
                    this.toastr.error('Unauthorized request found', 'Error!', { timeOut: 3000 });
                    this.blockUI.stop();
                    return;
                } else if (data.status === 401) {
                    this.toastr.error('Invalid Email Or Password', 'Error!', { timeOut: 3000 });
                    this.blockUI.stop();
                    return;
                } else if (data.status === 409) {
                    this.toastr.error('Invalid Email Or Password', 'Error!', { timeOut: 3000 });
                    this.blockUI.stop();
                    return;
                }

                if(data.status){
                    this.toastr.success('Logging Successfully', 'Success!', { timeOut: 2000 });
                    this.blockUI.stop();
                    this.router.navigate(['/']);
                    // this.router.navigate(['/']).then(() => {
                    //     this.blockUI.stop();
                    //     window.location.reload();
                    // });
                }else{
                    this.toastr.error(data.message, 'Error!', { timeOut: 3000 });
                    this.blockUI.stop();
                }
            },
            error => {
                this.blockUI.stop();
                if (error.status === 400) {
                    this.toastr.error('Unauthorized request found', 'Error!', { timeOut: 3000 });
                } else if (error.status === 401) {
                    this.toastr.error('Invalid Email Or Password', 'Error!', { timeOut: 3000 });
                } else if (error.status === 409) {
                    this.toastr.error('Invalid Email Or Password', 'Error!', { timeOut: 3000 });
                }
            }
        );
    }
}
