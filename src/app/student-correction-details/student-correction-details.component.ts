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
    selector: 'app-student-correction-details',
    templateUrl: './student-correction-details.component.html',
    styleUrls: ['./student-correction-details.component.css']
})
export class StudentCorrectionDetailsComponent implements OnInit {
    @ViewChild('submitAnswerModal') public submitAnswerModal: ModalDirective;
    modalRef?: BsModalRef;

    entryForm: FormGroup;
    submitted = false;
    is_loaded = false;

    @BlockUI() blockUI!: NgBlockUI;
    correctionList: Array<any> = [];
    myPackageList: Array<any> = [];
    syllebusList: Array<any> = [];
    topicList: Array<any> = [];
    topicDetails: any = null;

    correctionDetails: any = null;

    returnUrl: string;
    currentUser: any = null;
    public user_role = null;
    is_authenticated = false;
    is_topic_exist = false;

    modalTitle = 'Write an answer';
    btnSaveText = 'Submit';

    image_base_url = environment.imageURL;

    package_image = "assets/img/feature_image.png";
    correction_id;

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

        this.correction_id = this.route.snapshot.paramMap.get("correction_id");
        console.log(this.correction_id)
    }

    ngOnInit(): void {
        this.getCorrectionDetailsByID();
        // this.getMyPackageList();

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

    getCorrectionDetailsByID() {
        this.blockUI.start('Loading...');
        this._service.get('correction-details-by-id/' + this.correction_id).subscribe(res => {
            this.correctionDetails = res.data;
            this.is_loaded = true;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
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
        this.topicList = [];
        this.syllebusList = [];
        this.entryForm.controls['syllebus_id'].setValue(null);
        this.entryForm.controls['topic_id'].setValue(null);
        this.topicDetails = null;
        this.is_topic_exist = false;
        this._service.get('my-active-syllebus-list/' + this.entryForm.value.payment_id).subscribe(res => {
            this.syllebusList = res.data;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
    }

    getTopicList(){
        this.blockUI.start('Loading...');
        this.entryForm.controls['topic_id'].setValue(null);
        this.topicDetails = null;
        this.is_topic_exist = false;
        this._service.get('filter-topic-list/' + this.entryForm.value.syllebus_id).subscribe(res => {
            this.topicList = res.data;
            this.blockUI.stop();
        }, err => {
            this.blockUI.stop();
        });
    }

    selectTopic(){
        this.topicList.forEach(element => {
            if(element.id == this.entryForm.value.syllebus_id){
                this.topicDetails = element;
                this.is_topic_exist = true;
            }
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    closeModal(){
        this.modalRef?.hide();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }
        let package_id = 0;
        this.myPackageList.forEach(item => {
            if(item.payment_id == this.entryForm.value.payment_id){
                package_id = item.package_id
            }
        });

        let params = {
            "topic_id": this.entryForm.value.topic_id,
            "package_id": package_id,
            "student_correction": this.entryForm.value.answer
        }

        this.blockUI.start('Updating...');

        this._service.post('submit-correction', params).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.resetForm();
                    this.getCorrectionList();
                    this.modalHide();
                } else {
                    this.toastr.error(data.message, 'Error!', { timeOut: 2000 });
                }
            },
            err => {
                this.blockUI.stop();
                this.toastr.error(err.message || err, 'Error!', { timeOut: 2000 });
            }
        );
    }

    modalShow(){
        this.submitAnswerModal.show();
    }

    modalHide(){
        this.submitAnswerModal.hide();
    }

    resetForm(){
        this.submitted = false;
        this.entryForm.reset();
        this.topicDetails = null;
        this.is_topic_exist = false;
    }

}
