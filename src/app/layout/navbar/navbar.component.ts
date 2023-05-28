import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    returnUrl: string;
    currentUser: any = null;
    public user_role = null;
    is_authenticated = false;

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private toastr: ToastrService,
    ) { 
        if (this.authService.isAuthenticated()) {
            this.currentUser = this.authService.currentUserDetails.value;
            this.user_role = this.currentUser.user_type;
            this.is_authenticated = true;
        }
    }

    ngOnInit(): void {
    }

    userLogout() {
        this.authService.logout(window.location.hostname);
        Cookie.delete('.BBINAEW.Cookie', '/', window.location.hostname);
        this.authService.currentUserDetails.next(null);
        this.router.navigate(['/login']);
        this.toastr.success('Logout Successfully', 'Success!', { timeOut: 2000 });
        this.router.navigate(["/login"]);
    }

}
