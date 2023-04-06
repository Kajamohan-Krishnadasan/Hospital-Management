import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/dashboard/auth/login/login.component';
import { DoctorComponent } from './component/dashboard/doctor/doctor.component';
import { ViewDoctorComponent } from './component/dashboard/doctor/view-doctor/view-doctor.component';
import { PatientComponent } from './component/dashboard/patient/patient.component';
import { ViewPatientComponent } from './component/dashboard/patient/view-patient/view-patient.component';
import { AuthguardGuard } from './shared/guard/authguard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    children: [
      {
        path: '',
        redirectTo: 'patient',
        pathMatch: 'full',
      },
      {
        path: 'patient',
        component: PatientComponent,
      },
      {
        path: 'patient/:id',
        component: ViewPatientComponent,
      },
      {
        path: 'doctor',
        component: DoctorComponent,
      },
      {
        path: 'doctor/:id',
        component: ViewDoctorComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
