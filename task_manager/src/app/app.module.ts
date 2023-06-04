import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {DialogModule} from '@angular/cdk/dialog';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import { ProjectDialog } from './project-list/dialog/project_dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ProjectInfoComponent } from './project-info/project-info.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { OAuthModule } from 'angular-oauth2-oidc';
import { TaskCreate } from './project-info/task-create/task-create';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    UserListComponent,
    ProjectDialog,
    ProjectInfoComponent,
    TaskCreate
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    
    
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://192.168.1.100:8085'],
        sendAccessToken: true
    }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
