import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import {ModalDirective, BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-account-delete',
    templateUrl: './account-delete.component.html',
    styleUrls: ['./account-delete.component.css']
})
export class DeleteAccountComponent implements OnInit {
    @ViewChild('deleteModal') public deleteModal: ModalDirective;
    modalRef?: BsModalRef;

    @BlockUI() blockUI!: NgBlockUI;
    packageList: Array<any> = [];

    name = null;
    email = null;
    reason = null;

    modalTitle = 'Request Submited Successful';
    btnSaveText = 'Close';

    package_image = "assets/img/feature_image.png";
    package_id;

    constructor(
        private _service: CommonService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private modalService: BsModalService,
        private router: Router,
    ) {
        // this.package_id = this.route.snapshot.paramMap.get("id");
        // console.log(this.package_id)
    }

    ngOnInit(): void {
        //this.getPackageList();
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

    openModal(template: TemplateRef<any>) {
        if(!this.name || !this.email || !this.reason) {
            this.toastr.warning('Could You please fill the form!', 'Close');
            return;
        }

        this.modalRef = this.modalService.show(template);
    }

    openDeleteModal() {
        if(!this.name || !this.email || !this.reason) {
            this.toastr.warning('Could You please fill the form!', 'Close');
            return;
        }

        this.deleteModal.show();
    }

    modalHide(){
        this.deleteModal.hide();
        this.name = null;
        this.email = null;
        this.reason = null;
    }

    closeHide(){
        this.deleteModal?.hide();
        this.name = null;
        this.email = null;
        this.reason = null;
    }

}
