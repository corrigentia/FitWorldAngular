import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { ClassFormReactiveComponent } from './class/class-form-reactive/class-form-reactive.component';
import { ClassFormTemplateComponent } from './class/class-form-template/class-form-template.component';
import { ClassSearchComponent } from './class/class-search/class-search.component';
import { ClassesComponent } from './class/classes/classes.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';
import { EquipmentFormReactiveComponent } from './equipment/equipment-form-reactive/equipment-form-reactive.component';
import { EquipmentFormTemplateComponent } from './equipment/equipment-form-template/equipment-form-template.component';
import { EquipmentSearchComponent } from './equipment/equipment-search/equipment-search.component';
import { EquipmentsComponent } from './equipment/equipments/equipments.component';
import { InstructorDetailComponent } from './instructor/instructor-detail/instructor-detail.component';
import { InstructorFormReactiveComponent } from './instructor/instructor-form-reactive/instructor-form-reactive.component';
import { InstructorFormTemplateComponent } from './instructor/instructor-form-template/instructor-form-template.component';
import { InstructorSearchComponent } from './instructor/instructor-search/instructor-search.component';
import { InstructorsComponent } from './instructor/instructors/instructors.component';
import { MartialArtDetailComponent } from './martial-art/martial-art-detail/martial-art-detail.component';
import { MartialArtFormReactiveComponent } from './martial-art/martial-art-form-reactive/martial-art-form-reactive.component';
import { MartialArtFormTemplateComponent } from './martial-art/martial-art-form-template/martial-art-form-template.component';
import { MartialArtSearchComponent } from './martial-art/martial-art-search/martial-art-search.component';
import { MartialArtsComponent } from './martial-art/martial-arts/martial-arts.component';
import { LogInComponent } from './shared/auth/components/log-in/log-in.component';
import { RegisterComponent } from './shared/auth/components/register/register.component';
import { AuthGuard } from './shared/auth/guards/auth.guard';
import { ClassResolver } from './class/resolvers/class.resolver';
import { ClassesResolver } from './class/resolvers/classes.resolver';
import { EquipmentResolver } from './equipment/resolvers/equipment.resolver';
import { EquipmentsResolver } from './equipment/resolvers/equipments.resolver';
import { InstructorResolver } from './instructor/resolvers/instructor.resolver';
import { InstructorsResolver } from './instructor/resolvers/instructors.resolver';
import { MartialArtResolver } from './martial-art/resolvers/martial-art.resolver';
import { MartialArtsResolver } from './martial-art/resolvers/martial-arts.resolver';
import { StudentResolver } from './student/resolvers/student.resolver';
import { StudentsResolver } from './student/resolvers/students.resolver';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { StudentFormReactiveComponent } from './student/student-form-reactive/student-form-reactive.component';
import { StudentFormTemplateComponent } from './student/student-form-template/student-form-template.component';
import { StudentSearchComponent } from './student/student-search/student-search.component';
import { StudentsComponent } from './student/students/students.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { adminGuard } from './shared/auth/guards/admin.guard';
import { instructorOrHigherGuard } from './shared/auth/guards/instructor-or-higher.guard';
import { anonymousAdminNotInstructorUserGuard } from './shared/auth/guards/anonymous-admin-not-instructor-user.guard';
import { anonymousGuard } from './shared/auth/guards/anonymous.guard';
import { loggedInNotInstructorGuard } from './shared/auth/guards/logged-in-not-instructor.guard';

export const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    // redirectTo: '/dashboard',
    // redirectTo: 'dashboard',
    // redirectTo: 'classes',
    pathMatch: 'full',
  },
  /*
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  */
  // 31/01/2023
  // TODO: remove this route
  {
    path: 'students',
    canActivate: [AuthGuard],
    // canActivateChild: [instructorOrHigherGuard],
    children: [
      {
        path: '',
        component: StudentsComponent,
        resolve: {
          students: StudentsResolver,
        },
      },
      {
        path: 'newReactive',
        canActivate: [anonymousAdminNotInstructorUserGuard],
        canActivateChild: [anonymousAdminNotInstructorUserGuard],
        component: StudentFormReactiveComponent,
        resolve: {
          students: StudentsResolver,
        },
      },
      {
        path: 'new',
        canActivate: [anonymousAdminNotInstructorUserGuard],
        canActivateChild: [anonymousAdminNotInstructorUserGuard],
        component: StudentFormTemplateComponent,
        resolve: {
          students: StudentsResolver,
        },
      },
      {
        path: 'search',
        component: StudentSearchComponent,
        resolve: {
          students: StudentsResolver,
        },
      },
      {
        path: ':id',
        canActivate: [AuthGuard],
        component: StudentDetailComponent,
        resolve: {
          student: StudentResolver,
        },
      },
    ],
  },
  {
    path: 'register',
    canActivate: [anonymousGuard],
    component: RegisterComponent,
    title: 'Sign Up',
  },
  {
    path: 'log-in',
    canActivate: [anonymousGuard],
    component: LogInComponent,
    title: 'Sign In',
  },
  {
    path: 'instructors',
    canActivate: [AuthGuard, loggedInNotInstructorGuard],
    children: [
      {
        path: '',
        component: InstructorsComponent,
        resolve: {
          instructors: InstructorsResolver,
        },
      },
      {
        path: 'newReactive',
        component: InstructorFormReactiveComponent,
        resolve: {
          instructors: InstructorsResolver,
        },
      },
      {
        path: 'new',
        component: InstructorFormTemplateComponent,
        resolve: {
          instructors: InstructorsResolver,
        },
      },
      {
        path: 'search',
        component: InstructorSearchComponent,
        resolve: {
          instructors: InstructorsResolver,
        },
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: InstructorDetailComponent,
        resolve: {
          instructor: InstructorResolver,
        },
      },
    ],
  },
  {
    path: 'martial-arts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MartialArtsComponent,
        resolve: {
          martialArts: MartialArtsResolver,
        },
      },
      {
        path: 'newReactive',
        component: MartialArtFormReactiveComponent,
        resolve: {
          martialArts: MartialArtsResolver,
        },
      },
      {
        path: 'new',
        component: MartialArtFormTemplateComponent,
        resolve: {
          martialArts: MartialArtsResolver,
        },
      },
      {
        path: 'search',
        component: MartialArtSearchComponent,
        resolve: {
          martialArts: MartialArtsResolver,
        },
      },
      {
        path: ':id',
        component: MartialArtDetailComponent,
        resolve: {
          martialArt: MartialArtResolver,
        },
      },
    ],
  },
  {
    // main.ts:10  Error: NG04014: Invalid configuration of route '/classes': path cannot start with a slash
    path: 'classes',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ClassesComponent,
        resolve: { classes: ClassesResolver },
      },
      {
        path: 'newReactive',
        canActivate: [adminGuard],
        component: ClassFormReactiveComponent,
        resolve: {
          classes: ClassesResolver,
        },
      },
      {
        path: 'new',
        canActivate: [adminGuard],
        component: ClassFormTemplateComponent,
        resolve: {
          classes: ClassesResolver,
        },
      },
      {
        path: 'search',
        canActivate: [AuthGuard],
        component: ClassSearchComponent,
        resolve: {
          classes: ClassesResolver,
          martialArts: MartialArtsResolver,
          instructors: InstructorsResolver,
        },
      },
      {
        path: ':id',
        component: ClassDetailComponent,
        resolve: {
          martialArtClass: ClassResolver,
          instructors: InstructorsResolver,
          martialArts: MartialArtsResolver,
          // classes: ClassesResolver,
        },
      },
    ],
  },
  {
    path: 'equipments',
    canActivate: [AuthGuard],
    // without specifying component: EquipmentsComponent, on navigation away from and back to this route, no component is loaded ... never mind, I just had to include the resolver in the sub-route as well
    children: [
      {
        path: '',
        component: EquipmentsComponent,
        resolve: { equipments: EquipmentsResolver },
      },
      {
        path: 'newReactive',
        canActivate: [adminGuard],
        component: EquipmentFormReactiveComponent,
        resolve: { equipments: EquipmentsResolver },
      },
      {
        path: 'new',
        canActivate: [adminGuard],
        component: EquipmentFormTemplateComponent,
        resolve: { equipments: EquipmentsResolver },
      },
      {
        path: 'search',
        component: EquipmentSearchComponent,
        resolve: { equipments: EquipmentsResolver },
      },
      {
        // should NOT come before others, or it will capture the route and throw an error if it is not a number
        path: ':id',
        component: EquipmentDetailComponent,
        resolve: { equipment: EquipmentResolver },
      },
    ],
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    // component: PageNotFoundComponent,
    redirectTo: '/not-found',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
