import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
import { Page } from '../_models/page';
import {ModalDirective, BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
    @ViewChild('submitAnswerModal') public submitAnswerModal: ModalDirective;
    modalRef?: BsModalRef;

    entryForm: FormGroup;
    submitted = false;

    @BlockUI() blockUI!: NgBlockUI;
    correctionList: Array<any> = [];
    myPackageList: Array<any> = [];
    syllebusList: Array<any> = [];

    returnUrl: string;
    currentUser: any = null;
    public user_role = null;
    is_authenticated = false;

    modalTitle = 'Write an answer';
    btnSaveText = 'Submit';

    image_base_url = environment.imageURL;

    package_image = "assets/img/feature_image.png";
    package_id;

    page = new Page();

    constructor(
        private authService: AuthenticationService,
        private _service: CommonService,
        private modalService: BsModalService,
        public formBuilder: FormBuilder,
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
    }

    ngOnInit(): void {
        this.getCorrectionList();
        this.getMyPackageList();

        this.entryForm = this.formBuilder.group({
            payment_id: [null, [Validators.required]],
            syllebus_id: [null, [Validators.required]],
            topic_id: [null, [Validators.required]],
            answer: [null, [Validators.required]],
        });
    }

    get f() {
        return this.entryForm.controls;
    }

    getCorrectionList() {
        this.blockUI.start('Loading...');
        this._service.get('correction-list').subscribe(res => {
            this.correctionList = res.data;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
    }

    getMyPackageList() {
        this.blockUI.start('Loading...');
        this._service.get('my-package-list').subscribe(res => {
            this.myPackageList = res.data;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
    }

    getSyllebusByPaymentID(){
        this.blockUI.start('Loading...');
        this._service.get('my-active-syllebus-list/' + this.entryForm.value.payment_id).subscribe(res => {
            this.syllebusList = res.data;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    closeModal(){
        this.modalRef?.hide();
    }

    onFormSubmit(){

    }

    modalShow(){
        this.submitAnswerModal.show();
    }

    modalHide(){
        this.submitAnswerModal.hide();
    }

}
