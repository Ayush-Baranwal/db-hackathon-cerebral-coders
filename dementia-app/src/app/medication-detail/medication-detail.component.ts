// src/app/medication-detail/medication-detail.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ReminderService } from '../services/reminder.service';
import { Medication } from '../services/model/model.model';
import { MedicationService} from '../services/medication.service';

@Component({
  selector: 'app-medication-detail',
  templateUrl: './medication-detail.component.html',
  styleUrls: ['./medication-detail.component.scss']
})
export class MedicationDetailComponent implements OnInit {
  @Input() medications!: Medication[];

  constructor(private reminderService: ReminderService, private medicationService : MedicationService) { }

  ngOnInit(): void { 
    this.medications = this.medicationService.medications
  }

  setReminder(medication:any): void {
    console.log(medication)
    const times = this.calculateReminderTimes(medication);
    times.forEach(time => {
      this.reminderService.setReminder(time, () => {
        this.reminderService.sendReminder(`Time to take your medication: ${medication.name}`);
      });
    });
  }

  calculateReminderTimes(medication:any): Date[] {
    const times: Date[] = [];
    const frequencyInHours = parseInt(medication.frequency.split(' ')[0], 10);
    let nextReminder = new Date(medication.startDate);
    while (nextReminder < new Date(medication.endDate)) {
      times.push(new Date(nextReminder));
      nextReminder.setHours(nextReminder.getHours() + frequencyInHours);
    }
    return times;
  }
}
