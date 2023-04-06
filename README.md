# Hospital Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Default commands

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Project Structure

- add angular material
  **ng add @angular/material**
- add firebase
  **npm install firebase @angular/fire --save**

- add environment
  **ng g environments**

  open `enviroment.ts` and `enviroment.prod.ts` and add firebase config
  get firebase config from firebase console -> project settings -> general. copy and paste it in the file

  ```\
    firebaseConfig: {
      apiKey: 'here use your api key',
      authDomain: 'here use your auth domain',
      projectId: 'here use your project id',
      storageBucket: 'here use your storage bucket',
      messagingSenderId: 'here use your messaging sender id',
      appId: 'here use your app id',
  },

  ```

- import firebase module in `app.module.ts`

  ```\
  import { AngularFireModule } from '@angular/fire/compat';
  import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

  import { environment } from 'src/environments/environment';

  imports: [
    // ...

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  ```

- create separate module for each feature
  **ng g m material/material**

here you can import all the material modules and export them.

- in `material.module.ts`

```\

@NgModule({
declarations: [],
imports: [
  MatCardModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
],

exports: [
  MatCardModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
],
})
export class MaterialModule {}
```

these are the modules that i have used in this project. you can add more if you want.

import this module in `app.module.ts`

```\
import { MaterialModule } from './material/material.module';

imports: [
  // ...
  MaterialModule,
],
```

- add bootstrap in the `index.html` file

- in head tag

```\
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous" />

```

- in body tag

```\
<script
  src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
  integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
  crossorigin="anonymous"></script>
```

## create components

- create doctor component
  **ng g c components/dashboard/doctor**

  - add doctor component
    **ng g c components/dashboard/doctor/add-doctor**
  - delete doctor component
    **ng g c components/dashboard/doctor/delete-doctor**
  - view doctor component
    **ng g c components/dashboard/doctor/view-doctor**

- create patient component
  **ng g c components/dashboard/patient**

  - add patient component
    **ng g c components/dashboard/patient/add-patient**
  - delete patient component
    **ng g c components/dashboard/patient/delete-patient**
  - view patient component
    **ng g c components/dashboard/patient/view-patient**

- create loading component
  **ng g c components/loading**
  this component will be used to show loading animation when the login or singout is in progress.

- create login component
  **ng g c components/auth/login**

- create sidebar component
  **ng g c components/dashboard/sidebar**

## create shared folder for services, models and guards

### create services

- create auth service
  **ng g s shared/services/auth**

  in this service we will add the login and logout functionality.

- create data service
  **ng g s shared/services/data**

  in this service we will add the crud functionality for doctor and patient.

  1. add doctor
  2. delete doctor
  3. view doctor
  4. add patient
  5. delete patient
  6. view patient

### create models

- create doctor model
  **ng g class shared/models/doctor**
- create patient model
  **ng g class shared/models/patient**

### create guards

- create auth guard
  **ng g g shared/guards/auth**
  here we will check if the user is logged in or not.
