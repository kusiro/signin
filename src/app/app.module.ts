import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { IndividualSignupComponent } from './signup/individual-signup/individual-signup.component';
import { TeamSignupComponent } from './signup/team-signup/team-signup.component';
import { SignupService } from './signup/signup.service';
import { DisplayTitlePipe } from './display-title.pipe';
import { SizeInfoComponent } from './signup/size-info/size-info.component';
import { MemberFormComponent } from './signup/member-form/member-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    IndividualSignupComponent,
    TeamSignupComponent,
    DisplayTitlePipe,
    SizeInfoComponent,
    MemberFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbModule.forRoot()
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
