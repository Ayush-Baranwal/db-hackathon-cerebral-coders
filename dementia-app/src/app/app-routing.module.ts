import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { InfoComponent } from "./info/info.component";
import { AppointmentSchedulerComponent } from "./appointment-scheduler/appointment-scheduler.component";
import { MediManageComponent } from "./medi-manage/medi-manage.component";

const routes : Routes = [
    {
        path : '',
        component : HomeComponent
    } ,
    {
        path : 'info' , 
        component : InfoComponent
    },
    {
        path : 'contact',
        component : ContactComponent
    }, 
    {
        path : 'services',
        component : AppointmentSchedulerComponent
    },
    {
        path : 'medication',
        component : MediManageComponent
    }
]
@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule {

}