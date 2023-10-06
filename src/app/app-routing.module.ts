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

export const routes: Routes = [
  {
    // path: '/',
    path: '',
    // redirectTo: '/dashboard',
    // redirectTo: 'dashboard',
    redirectTo: 'classes',
    pathMatch: 'full',
  },
  /*
  {
    // path: '/dashboard',
    path: 'dashboard',
    component: DashboardComponent,
  },
  */
  // 31/01/2023
  // TODO: remove this route
  {
    // path: '/students/newReactive',
    path: 'students/newReactive',
    component: StudentFormReactiveComponent,
    resolve: {
      students: StudentsResolver,
    },
  },
  {
    // path: '/students/new',
    path: 'students/new',
    component: StudentFormTemplateComponent,
    resolve: {
      students: StudentsResolver,
    },
  },
  {
    // path: '/students/search',
    path: 'students/search',
    component: StudentSearchComponent,
    resolve: {
      students: StudentsResolver,
    },
  },
  {
    // path: '/students/:id',
    path: 'students/:id',
    component: StudentDetailComponent,
    resolve: {
      student: StudentResolver,
    },
  },
  {
    // path: '/students',
    path: 'students',
    component: StudentsComponent,
    resolve: {
      students: StudentsResolver,
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Sign Up',
  },
  {
    path: 'log-in',
    component: LogInComponent,
    title: 'Sign In',
  },
  {
    // path: '/instructors/newReactive',
    path: 'instructors/newReactive',
    component: InstructorFormReactiveComponent,
    resolve: {
      instructors: InstructorsResolver,
    },
  },
  {
    // path: '/instructors/new',
    path: 'instructors/new',
    component: InstructorFormTemplateComponent,
    resolve: {
      instructors: InstructorsResolver,
    },
  },
  {
    // path: '/instructors/search',
    path: 'instructors/search',
    component: InstructorSearchComponent,
    resolve: {
      instructors: InstructorsResolver,
    },
    canActivate: [AuthGuard],
  },
  {
    // path: '/instructors/:id',
    path: 'instructors/:id',
    component: InstructorDetailComponent,
    resolve: {
      instructor: InstructorResolver,
    },
  },
  {
    // path: '/instructors',
    path: 'instructors',
    component: InstructorsComponent,
    resolve: {
      instructors: InstructorsResolver,
    },
  },
  {
    // path: '/martial-arts/newReactive',
    path: 'martial-arts/newReactive',
    component: MartialArtFormReactiveComponent,
    resolve: {
      martialArts: MartialArtsResolver,
    },
  },
  {
    // path: '/martial-arts/new',
    path: 'martial-arts/new',
    component: MartialArtFormTemplateComponent,
    resolve: {
      martialArts: MartialArtsResolver,
    },
  },
  {
    // path: '/martial-arts/search',
    path: 'martial-arts/search',
    component: MartialArtSearchComponent,
    resolve: {
      martialArts: MartialArtsResolver,
    },
  },
  {
    // path: '/martial-arts/:id',
    path: 'martial-arts/:id',
    component: MartialArtDetailComponent,
    resolve: {
      martialArt: MartialArtResolver,
    },
  },
  {
    // path: '/martial-arts',
    path: 'martial-arts',
    component: MartialArtsComponent,
    resolve: {
      martialArts: MartialArtsResolver,
    },
  },
  {
    // path: '/classes/newReactive',
    path: 'classes/newReactive',
    component: ClassFormReactiveComponent,
    resolve: {
      classes: ClassesResolver,
    },
  },
  {
    // path: '/classes/new',
    path: 'classes/new',
    component: ClassFormTemplateComponent,
    resolve: {
      classes: ClassesResolver,
    },
  },
  {
    // path: '/classes/search',
    path: 'classes/search',
    component: ClassSearchComponent,
    resolve: {
      classes: ClassesResolver,
      martialArts: MartialArtsResolver,
      instructors: InstructorsResolver,
    },
  },
  {
    // path: '/classes/:id',
    path: 'classes/:id',
    component: ClassDetailComponent,
    resolve: {
      martialArtClass: ClassResolver,
      instructors: InstructorsResolver,
      martialArts: MartialArtsResolver,
      // classes: ClassesResolver,
    },
  },
  {
    // path: '/classes',
    path: 'classes',
    component: ClassesComponent,
    resolve: {
      classes: ClassesResolver,
    },
  },
  {
    // path: '/equipments/newReactive',
    path: 'equipments/newReactive',
    component: EquipmentFormReactiveComponent,
    resolve: {
      equipments: EquipmentsResolver,
    },
  },
  {
    // path: '/equipments/new',
    path: 'equipments/new',
    component: EquipmentFormTemplateComponent,
    resolve: {
      equipments: EquipmentsResolver,
    },
  },
  {
    // path: '/equipments/search',
    path: 'equipments/search',
    component: EquipmentSearchComponent,
    resolve: {
      equipments: EquipmentsResolver,
    },
  },
  {
    // path: '/equipments/:id',
    path: 'equipments/:id',
    component: EquipmentDetailComponent,
    resolve: {
      equipment: EquipmentResolver,
    },
  },
  {
    // path: '/equipments',
    path: 'equipments',
    component: EquipmentsComponent,
    resolve: {
      equipments: EquipmentsResolver,
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
