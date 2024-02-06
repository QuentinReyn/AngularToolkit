import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModelToFormComponent } from './views/model-to-form/model-to-form.component';
import { JsonToFormComponent } from './views/json-to-form/json-to-form.component';

const routes: Routes = [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'model-to-form', component: ModelToFormComponent },
      { path: 'json-to-form', component: JsonToFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
