import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../_services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../_services/authentication.service';
//import * as moment from 'moment';

@Component({
    selector: 'app-package-details',
    templateUrl: './package-details.component.html',
    styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
    entryForm: FormGroup;
    submitted = false;
    returnUrl: string;

    @BlockUI() blockUI!: NgBlockUI;
    package_id;
    is_loaded = false;
    is_loggedin = false;
    package_image = "assets/img/feature_image.png";

    packageDetails: any = null;
    syllebusList: Array<any> = [];
    purchaseSyllebusList: Array<any> = [];

    total_price = 0;

    constructor(
        private _service: CommonService,
        private toastr: ToastrService,
        public formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        public readonly swalTargets: SwalPortalTargets,
        private router: Router,
    ) {
        this.package_id = this.route.snapshot.paramMap.get("id");
    }

    ngOnInit(): void {

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.is_loggedin = this.authService.isAuthenticated();
        // if (!this.authService.isAuthenticated()) {
        //     this.router.navigate(['/login']);
        // }

        this.getPackageiDetails();
        this.getSyllabusList();

        this.entryForm = this.formBuilder.group({
            id: [null],
            package_id: [this.package_id, [Validators.required]],
            syllebus_id: [null, [Validators.required]],
            quantity: [0, [Validators.required]],
        });
    }

    get f() {
        return this.entryForm.controls;
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

    loginFirst(){
        this.toastr.error('Please, do login first!', 'Attention!');
        this.router.navigate(['/login']);
    }

    addItemToList()
    {
        let syllebus = this.syllebusList.find(x => x.id === this.entryForm.value.syllebus_id);
        if(this.packageDetails.limit < this.entryForm.value.quantity){
            this.toastr.error('Please, enter correct quantity!', 'Attention!');
            return;
        }

        if(this.entryForm.value.quantity <= 0){
            this.toastr.error('Please, enter correct quantity!', 'Attention!');
            return;
        }

        let params = {
            syllebus_id: syllebus.id,
            syllebus_name: syllebus.name,
            quantity: this.entryForm.value.quantity,
            unit_price: syllebus.price,
            price: this.entryForm.value.quantity * syllebus.price,
        }

        const index = this.purchaseSyllebusList.findIndex(item => item.syllebus_id === syllebus.id);

        if(index === -1){
            let total_quantity = 0;
            this.purchaseSyllebusList.forEach(item => {
                total_quantity = total_quantity + item.quantity
            });

            total_quantity = total_quantity + this.entryForm.value.quantity;

            if(this.packageDetails.limit < total_quantity){
                this.toastr.error('Please, enter correct quantity!', 'Attention!');
                return;
            }

            this.purchaseSyllebusList.push(params);
            
            this.total_price = 0;
            this.purchaseSyllebusList.forEach(element => {
                this.total_price = this.total_price + element.price
            });

        }else{
            this.toastr.error('Item Already exist!', 'Attention!');
            return;
        }
    }

    deleteItemFromCart(row){
        const index = this.purchaseSyllebusList.findIndex(item => item.syllebus_id === row.syllebus_id);
        this.purchaseSyllebusList.splice(index, 1);
        
        this.total_price = 0;
        this.purchaseSyllebusList.forEach(element => {
            this.total_price = this.total_price + element.price
        });
    }

    confirmPayment(){
        let total_quantity = 0;
        this.purchaseSyllebusList.forEach(item => {
            total_quantity = total_quantity + item.quantity
        });

        if(total_quantity <= 0){
            this.toastr.error('Please, Add item!', 'Attention!');
            return;
        }

        this.total_price = 0;
        let submit_items: Array<any> = [];
        this.purchaseSyllebusList.forEach(element => {
            this.total_price = this.total_price + element.price;
            let object = {
                package_type_id: element.syllebus_id,
                quantity: element.quantity
            }
            submit_items.push(object);
        });

        let params = {
            package_id: this.package_id,
            is_promo_applied: false,
            promo: null,
            payable_amount: this.total_price,
            paid_amount: this.total_price,
            discount_amount: 0,
            currency: "BDT",
            payment_method: "BKASH-BKash",
            items: submit_items
        }

        console.log(params)

        this.blockUI.start('Submitting...');
        this._service.post('web/make-payment', params).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.purchaseSyllebusList = [];
                    this.entryForm.reset();
                    this.submitted = false;
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

    // validateDateTimeFormat(value: Date) {
    //     return moment(value).format('YYYY-MM-DD');
    // }

}
