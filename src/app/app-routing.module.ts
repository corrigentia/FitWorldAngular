import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './student/students/students.component';
import { InstructorsComponent } from './instructor/instructors/instructors.component';
import { MartialArtsComponent } from './martial-art/martial-arts/martial-arts.component';
import { ClassesComponent } from './class/classes/classes.component';
import { EquipmentsComponent } from './equipment/equipments/equipments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { InstructorDetailComponent } from './instructor/instructor-detail/instructor-detail.component';
import { MartialArtDetailComponent } from './martial-art/martial-art-detail/martial-art-detail.component';
import { ClassDetailComponent } from './class/class-detail/class-detail.component';
import { EquipmentDetailComponent } from './equipment/equipment-detail/equipment-detail.component';
import { StudentFormReactiveComponent } from './student/student-form-reactive/student-form-reactive.component';
import { StudentFormTemplateComponent } from './student/student-form-template/student-form-template.component';
import { StudentSearchComponent } from './student/student-search/student-search.component';
import { InstructorFormReactiveComponent } from './instructor/instructor-form-reactive/instructor-form-reactive.component';
import { InstructorFormTemplateComponent } from './instructor/instructor-form-template/instructor-form-template.component';
import { InstructorSearchComponent } from './instructor/instructor-search/instructor-search.component';
import { MartialArtFormReactiveComponent } from './martial-art/martial-art-form-reactive/martial-art-form-reactive.component';
import { MartialArtFormTemplateComponent } from './martial-art/martial-art-form-template/martial-art-form-template.component';
import { MartialArtSearchComponent } from './martial-art/martial-art-search/martial-art-search.component';
import { ClassFormReactiveComponent } from './class/class-form-reactive/class-form-reactive.component';
import { ClassFormTemplateComponent } from './class/class-form-template/class-form-template.component';
import { ClassSearchComponent } from './class/class-search/class-search.component';
import { EquipmentFormReactiveComponent } from './equipment/equipment-form-reactive/equipment-form-reactive.component';
import { EquipmentFormTemplateComponent } from './equipment/equipment-form-template/equipment-form-template.component';
import { EquipmentSearchComponent } from './equipment/equipment-search/equipment-search.component';

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
  },
  {
    // path: '/students/new',
    path: 'students/new',
    component: StudentFormTemplateComponent,
  },
  {
    // path: '/students/search',
    path: 'students/search',
    component: StudentSearchComponent,
  },
  {
    // path: '/students/:id',
    path: 'students/:id',
    component: StudentDetailComponent,
  },
  {
    // path: '/students',
    path: 'students',
    component: StudentsComponent,
  },
  {
    // path: '/instructors/newReactive',
    path: 'instructors/newReactive',
    component: InstructorFormReactiveComponent,
  },
  {
    // path: '/instructors/new',
    path: 'instructors/new',
    component: InstructorFormTemplateComponent,
  },
  {
    // path: '/instructors/search',
    path: 'instructors/search',
    component: InstructorSearchComponent,
  },
  {
    // path: '/instructors/:id',
    path: 'instructors/:id',
    component: InstructorDetailComponent,
  },
  {
    // path: '/instructors',
    path: 'instructors',
    component: InstructorsComponent,
  },
  {
    // path: '/martial-arts/newReactive',
    path: 'martial-arts/newReactive',
    component: MartialArtFormReactiveComponent,
  },
  {
    // path: '/martial-arts/new',
    path: 'martial-arts/new',
    component: MartialArtFormTemplateComponent,
  },
  {
    // path: '/martial-arts/search',
    path: 'martial-arts/search',
    component: MartialArtSearchComponent,
  },
  {
    // path: '/martial-arts/:id',
    path: 'martial-arts/:id',
    component: MartialArtDetailComponent,
  },
  {
    // path: '/martial-arts',
    path: 'martial-arts',
    component: MartialArtsComponent,
  },
  {
    // path: '/classes/newReactive',
    path: 'classes/newReactive',
    component: ClassFormReactiveComponent,
  },
  {
    // path: '/classes/new',
    path: 'classes/new',
    component: ClassFormTemplateComponent,
  },
  {
    // path: '/classes/search',
    path: 'classes/search',
    component: ClassSearchComponent,
  },
  {
    // path: '/classes/:id',
    path: 'classes/:id',
    component: ClassDetailComponent,
  },
  {
    // path: '/classes',
    path: 'classes',
    component: ClassesComponent,
  },
  {
    // path: '/equipments/newReactive',
    path: 'equipments/newReactive',
    component: EquipmentFormReactiveComponent,
  },
  {
    // path: '/equipments/new',
    path: 'equipments/new',
    component: EquipmentFormTemplateComponent,
  },
  {
    // path: '/equipments/search',
    path: 'equipments/search',
    component: EquipmentSearchComponent,
  },
  {
    // path: '/equipments/:id',
    path: 'equipments/:id',
    component: EquipmentDetailComponent,
  },
  {
    // path: '/equipments',
    path: 'equipments',
    component: EquipmentsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
