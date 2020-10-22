import { AppComponent } from './app.component';
import { AppContext } from '../middleware/app.context';
import { AppService } from '../middleware/services/app.service';
import { AppSession } from '../middleware/utils/app.session';
import { BreadCrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { BreadCrumbItemComponent } from '../components/breadcrumb/breadcrumbitem/breadcrumbitem.component';
import { BreadCrumbSession } from '../middleware/utils/breadcrumb.session';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DialogOneInputComponent } from '../components/dialogoneinput/dialogoneinput.component';
import { FileService } from '../middleware/services/file.service';
import { FileSession } from '../middleware/utils/file.session';
import { FormsModule } from '@angular/forms';
import { GapiSession } from '../middleware/utils/gapi.session';
import { MenuComponent } from '../components/menu/menu.component';
import { LoggedInGuard } from '../middleware/utils/loggedInGuard';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { routing } from './app.routing';
import { SignInComponent } from '../components/signin/signin.component';
import { UserService } from '../middleware/services/user.service';
import { UserSession } from '../middleware/utils/user.session';
import { FilesUploadComponent } from '../components/filesupload/filesupload.component';
import { StoreModule} from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { DialogShareableLinksComponent } from '../components/dialogshareablelinks/dialogshareablelinks.component';
import { reducers, metaReducers } from '../middleware/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent,
    BreadCrumbComponent,
    BreadCrumbItemComponent,
    DashboardComponent,
    DialogOneInputComponent,
    DialogShareableLinksComponent,
    FilesUploadComponent,
    MenuComponent,
    SignInComponent,
  ],
  entryComponents: [
    DialogOneInputComponent,
    DialogShareableLinksComponent,
    FilesUploadComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    routing,
    MatBottomSheetModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true },
    AppContext,

    AppSession,
    FileSession,
    GapiSession,
    UserSession,

    AppService,
    BreadCrumbSession,
    FileService,
    UserService,

    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
