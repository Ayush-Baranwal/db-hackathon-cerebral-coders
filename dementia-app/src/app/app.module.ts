import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { InfoComponent } from './info/info.component';
import { FormsModule } from '@angular/forms';
import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';
import { HttpClientModule } from '@angular/common/http';
import { AddMedicationComponent } from './add-medication/add-medication.component';
import { MedicationDetailComponent } from './medication-detail/medication-detail.component';
import { MedicationListComponent } from './medication-list/medication-list.component';
import { MediManageComponent } from './medi-manage/medi-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ChatbotComponent,
    ContactComponent,
    FaqComponent,
    InfoComponent,
    AppointmentSchedulerComponent,
    AddMedicationComponent,
    MedicationDetailComponent,
    MedicationListComponent,
    MediManageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers : [],
  bootstrap : [AppComponent]
})
export class AppModule {
  
}
