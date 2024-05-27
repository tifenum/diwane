import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';
import { RouterModule, Routes } from '@angular/router'; 
import { FormComponent } from './form/form.component';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompteComponent } from './compte/compte.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { ParticulierComponent } from './particulier/particulier.component';

import { Autorisation2Component } from './autorisation2/autorisation2.component';
import { Autorisation3Component } from './autorisation3/autorisation3.component';
import { Autorisation4Component } from './autorisation4/autorisation4.component';
import { InspecteurComponent } from './inspecteur/inspecteur.component';
import {ChefComponent } from './chef/chef.component';
import { AfficheformComponent } from './afficheform/afficheform.component';
import { AjoutbureauComponent } from './ajoutbureau/ajoutbureau.component';
import { AdminComponent } from './admin/admin.component';
import { ChatComponent } from './chat/chat.component';


import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { UserListComponent } from './user-list/user-list.component';
import { DemandeComponent } from './demande/demande.component';
import { AuthIntercepterService } from './service/interceptor.interceptor';
import { Autorisation1Component } from './autorisation1/autorisation1.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { RecComponent } from './rec/rec.component';
import { DatePipe } from '@angular/common';
import { TestComponent } from './test/test.component';
import { MyformComponent } from './myform/myform.component';
import { UpdateForm1Component } from './update-form1/update-form1.component';
import { UpdateForm2Component } from './update-form2/update-form2.component';
import { UpdateForm3Component } from './update-form3/update-form3.component';
import { UpdateForm4Component } from './update-form4/update-form4.component';
import { AjoubureauxxComponent } from './ajoubureauxx/ajoubureauxx.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {  HttpClient } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FeedbackComponent } from './feedback/feedback.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DemandevalidComponent } from './demandevalid/demandevalid.component';
import { StatusCheckComponent } from './status-check/status-check.component';
// import {  ValidatedDemandeComponent } from './validateddemande/validateddemande.component';
import { QRCodeModule } from 'angularx-qrcode';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    FormComponent,
    
    CompteComponent,
    EntrepriseComponent,
    ParticulierComponent,
   
    Autorisation2Component,
    Autorisation3Component,
    Autorisation4Component,
    ChefComponent,
    InspecteurComponent,
    AfficheformComponent,
    AjoutbureauComponent,
    AdminComponent,
    ChatComponent,
    FeedbackComponent,
  
    NotFoundComponent,
    UserListComponent,
    DemandeComponent,
    Autorisation1Component,
    ReclamationComponent,
    UserListComponent,
    RecComponent,
    TestComponent,
    MyformComponent,
    UpdateForm1Component,
    UpdateForm2Component,
    UpdateForm3Component,
    UpdateForm4Component,
    AjoubureauxxComponent,
    DashboardComponent,
    FeedbackComponent,
    DemandevalidComponent,
    StatusCheckComponent,
    // ValidatedDemandeComponent,
    
   

    // ... vos autres déclarations de composants ici
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDropdownModule,
    SocialLoginModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    MatButtonToggleModule,
    AppRoutingModule,
    FormsModule ,
    NgApexchartsModule,
    QRCodeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide :HTTP_INTERCEPTORS, useClass:AuthIntercepterService,multi :true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
      
        ]
      } as SocialAuthServiceConfig,
    },
    provideAnimationsAsync(),
   
    DatePipe 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Si vous utilisez des éléments personnalisés
})
export class AppModule { }
