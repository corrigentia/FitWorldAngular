import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { ClassFormReactiveComponent } from './class/class-form-reactive/class-form-reactive.component';
import { ClassFormTemplateComponent } from './class/class-form-template/class-form-template.component';
import { ClassFormComponent } from './class/class-form/class-form.component';
import { ClassSearchComponent } from './class/class-search/class-search.component';
import { ClassesComponent } from './class/classes/classes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';
import { EquipmentFormReactiveComponent } from './equipment/equipment-form-reactive/equipment-form-reactive.component';
import { EquipmentFormTemplateComponent } from './equipment/equipment-form-template/equipment-form-template.component';
import { EquipmentFormComponent } from './equipment/equipment-form/equipment-form.component';
import { EquipmentSearchComponent } from './equipment/equipment-search/equipment-search.component';
import { EquipmentsComponent } from './equipment/equipments/equipments.component';
import { InstructorDetailComponent } from './instructor/instructor-detail/instructor-detail.component';
import { InstructorFormReactiveComponent } from './instructor/instructor-form-reactive/instructor-form-reactive.component';
import { InstructorFormTemplateComponent } from './instructor/instructor-form-template/instructor-form-template.component';
import { InstructorFormComponent } from './instructor/instructor-form/instructor-form.component';
import { InstructorSearchComponent } from './instructor/instructor-search/instructor-search.component';
import { InstructorsComponent } from './instructor/instructors/instructors.component';
import { MartialArtDetailComponent } from './martial-art/martial-art-detail/martial-art-detail.component';
import { MartialArtFormReactiveComponent } from './martial-art/martial-art-form-reactive/martial-art-form-reactive.component';
import { MartialArtFormTemplateComponent } from './martial-art/martial-art-form-template/martial-art-form-template.component';
import { MartialArtFormComponent } from './martial-art/martial-art-form/martial-art-form.component';
import { MartialArtSearchComponent } from './martial-art/martial-art-search/martial-art-search.component';
import { MartialArtsComponent } from './martial-art/martial-arts/martial-arts.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthInterceptor } from './shared/auth/classes/interceptors/auth-interceptor.interceptor';
import { UniqueClassValidatorDirective } from './shared/directives/class.directive';
import { DateTimeValidatorDirective } from './shared/directives/date-time.directive';
import { DigitCharValidatorDirective } from './shared/directives/digit-char.directive';
import { EmailTldValidatorDirective } from './shared/directives/email-tld.directive';
import { UniqueEmailValidatorDirective } from './shared/directives/email.directive';
import { UniqueEquipmentValidatorDirective } from './shared/directives/equipment.directive';
import { IdValidatorDirective } from './shared/directives/id.directive';
import { IdentityRevealedValidatorDirective } from './shared/directives/identity-revealed.directive';
import { InstructorIdValidatorDirective } from './shared/directives/instructor-id.directive';
import { UniqueInstructorValidatorDirective } from './shared/directives/instructor.directive';
import { LowercaseCharValidatorDirective } from './shared/directives/lowercase-char.directive';
import { MartialArtIdValidatorDirective } from './shared/directives/martial-art-id.directive';
import { UniqueMartialArtValidatorDirective } from './shared/directives/martial-art.directive';
import { SymbolCharValidatorDirective } from './shared/directives/symbol-char.directive';
import { UniqueUsernameUpdateValidatorDirective } from './shared/directives/unique-username-update-validator.directive';
import { UppercaseCharValidatorDirective } from './shared/directives/uppercase-char.directive';
import { UniqueUsernameValidatorDirective } from './shared/directives/username.directive';
import { WhiteSpaceValidatorDirective } from './shared/directives/white-space.directive';
import { Logger } from './shared/services/logger.service';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentFormReactiveComponent } from './student/student-form-reactive/student-form-reactive.component';
import { StudentFormTemplateComponent } from './student/student-form-template/student-form-template.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { StudentSearchComponent } from './student/student-search/student-search.component';
import { StudentsComponent } from './student/students/students.component';
import { RegisterComponent } from './shared/auth/components/register/register.component';
import { LogInComponent } from './shared/auth/components/log-in/log-in.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/services/in-memory-data.service';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
// import { ForbiddenNameDirective } from './shared/directives/forbidden-name.directive';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailComponent,
    EquipmentsComponent,
    MartialArtsComponent,
    MartialArtDetailComponent,
    InstructorsComponent,
    InstructorDetailComponent,
    EquipmentDetailComponent,
    ClassesComponent,
    ClassDetailComponent,
    MessagesComponent,
    DashboardComponent,
    StudentSearchComponent,
    MartialArtSearchComponent,
    InstructorSearchComponent,
    EquipmentSearchComponent,
    ClassSearchComponent,
    MartialArtFormComponent,
    MartialArtFormTemplateComponent,
    MartialArtFormReactiveComponent,
    StudentFormComponent,
    StudentFormTemplateComponent,
    StudentFormReactiveComponent,
    UniqueUsernameUpdateValidatorDirective,
    IdentityRevealedValidatorDirective,
    UniqueEquipmentValidatorDirective,
    EquipmentFormComponent,
    EquipmentFormReactiveComponent,
    EquipmentFormTemplateComponent,
    UniqueMartialArtValidatorDirective,
    InstructorFormComponent,
    InstructorFormReactiveComponent,
    InstructorFormTemplateComponent,
    UniqueInstructorValidatorDirective,
    UniqueEmailValidatorDirective,
    UniqueUsernameValidatorDirective,
    WhiteSpaceValidatorDirective,
    LowercaseCharValidatorDirective,
    UppercaseCharValidatorDirective,
    DigitCharValidatorDirective,
    SymbolCharValidatorDirective,
    EmailTldValidatorDirective,
    ClassFormComponent,
    ClassFormReactiveComponent,
    ClassFormTemplateComponent,
    IdValidatorDirective,
    DateTimeValidatorDirective,
    MartialArtIdValidatorDirective,
    InstructorIdValidatorDirective,
    UniqueClassValidatorDirective,
    // UsernameDirective,
    UniqueUsernameValidatorDirective,
    RegisterComponent,
    LogInComponent,
    PageNotFoundComponent,
    // ForbiddenNameDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // TODO: Comment it out to have the server handle HTTP requests!!
    /**
     * intercepts HTTP requests
     * and returns simulated server responses.
     * TODO: Remove it when a real server is ready to receive requests!
     */

    /*
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      // passThruUnknownUrl: false,
    }),
    */

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, // <-- for formGroup
    RouterModule,
  ],
  providers: [
    /* logger */
    Logger,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [
    /* AppComponent */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
