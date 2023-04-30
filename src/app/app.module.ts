import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BannerComponent } from './layout/banner/banner.component';
import { AboutComponent } from './home/about/about.component';
import { ExpertsComponent } from './home/experts/experts.component';
import { ServiceFlowComponent } from './home/service-flow/service-flow.component';
import { PackagesComponent } from './home/packages/packages.component';
import { ReviewComponent } from './home/review/review.component';
import { FaqComponent } from './home/faq/faq.component';
import { DownloadComponent } from './home/download/download.component';
import { FooterComponent } from './home/footer/footer.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { HomePageLayoutComponent } from './layout/home-page-layout/home-page-layout.component';
import { BlockUIModule } from 'ng-block-ui';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { TruncatePipe } from './_helpers/truncate-pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BannerComponent,
    AboutComponent,
    ExpertsComponent,
    ServiceFlowComponent,
    PackagesComponent,
    ReviewComponent,
    FaqComponent,
    DownloadComponent,
    FooterComponent,
    DefaultLayoutComponent,
    HomePageLayoutComponent,
    // TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
