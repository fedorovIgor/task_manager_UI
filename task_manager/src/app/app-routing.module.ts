import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [ 
  {path: 'project', component: ProjectListComponent},
  {path: 'project/:id', component: ProjectInfoComponent},
  {path: 'user', component: UserListComponent},
  {path: '**', redirectTo: 'project', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
