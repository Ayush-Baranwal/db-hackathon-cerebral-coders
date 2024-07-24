import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  setReminder(time: Date, callback: () => void): void {
    const now = new Date();
    const delay = time.getTime() - now.getTime();
    if (delay > 0) {
      setTimeout(callback, delay);
    }
  }

  sendReminder(message: string): void {
    alert(message);
  }
}
