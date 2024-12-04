import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellsListComponent } from './sells-list/sells-list.component';
import { SellFormComponent } from './sell-form/sell-form.component';

const routes: Routes = [
  { path: '', component: SellsListComponent },
  { path: 'add', component: SellFormComponent },
  { path: 'update', component: SellFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellsRoutingModule {}
