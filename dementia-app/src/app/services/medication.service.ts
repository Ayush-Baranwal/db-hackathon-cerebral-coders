// src/app/medication.service.ts
import { Injectable } from '@angular/core';
import { Medication } from './model/model.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  medications: Medication[] = [];

  constructor() { }

  getMedications(): Medication[] {
    return this.medications;
  }

  addMedication(medication: Medication): void {
    this.medications.push(medication);
  }

  updateMedication(medication: Medication): void {
    const index = this.medications.findIndex(m => m.id === medication.id);
    if (index !== -1) {
      this.medications[index] = medication;
    }
  }

  deleteMedication(id: number): void {
    this.medications = this.medications.filter(m => m.id !== id);
  }
}
