// src/app/medication-list/medication-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MedicationService } from '../services/medication.service';
import { Medication } from '../services/model/model.model';

@Component({
  selector: 'app-medication-list',
  templateUrl: './medication-list.component.html',
  styleUrls: ['./medication-list.component.scss']
})
export class MedicationListComponent implements OnInit {
  medications: Medication[] = [];

  constructor(private medicationService: MedicationService) { }

  ngOnInit(): void {
    this.medications = this.medicationService.getMedications();
  }

  deleteMedication(id: number): void {
    this.medicationService.deleteMedication(id);
    this.medications = this.medicationService.getMedications();
  }
}
