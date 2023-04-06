import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Doctor } from '../model/doctor';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private angularFirestoreService: AngularFirestore) {}

  /**
   * Doctor Service
   */
  // add new doctor in the firebase
  addDoctor(doctor: Doctor) {
    doctor.id = this.angularFirestoreService.createId();
    return this.angularFirestoreService.collection('Doctor/').add(doctor);
  }

  // get all doctors details
  getAllDoctors() {
    return this.angularFirestoreService.collection('Doctor/').snapshotChanges();
  }

  // update doctors details
  updateDoctor(doctor: Doctor) {
    return this.angularFirestoreService
      .collection('Doctor/')
      .doc(doctor.id)
      .update(doctor);
  }

  //delete doctor
  deleteDoctor(id: string) {
    return this.angularFirestoreService.collection('Doctor/').doc(id).delete();
  }

  // get doctor by id
  getDoctorById(id: string) {
    return this.angularFirestoreService.doc('Doctor/' + id).valueChanges();
  }

  /*
   * Patient Service
   */
  // add patient
  addPatient(patient: Patient) {
    patient.patient_id = this.angularFirestoreService.createId();
    return this.angularFirestoreService.collection('Patient/').add(patient);
  }

  // get all Patient details
  getAllPatient() {
    return this.angularFirestoreService
      .collection('Patient/')
      .snapshotChanges();
  }

  // get doctor by id
  getPatientById(id: string) {
    return this.angularFirestoreService.doc('Patient/' + id).valueChanges();
  }

  // update patient details
  updatePatient(patient: Patient) {
    return this.angularFirestoreService
      .collection('Patient/')
      .doc(patient.patient_id)
      .update(patient);
  }

  //delete patient
   deletePatient(id: string) {
    return this.angularFirestoreService.collection('Patient/').doc(id).delete();
  }
}
