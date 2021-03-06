import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxUiLoaderModule,NgxUiLoaderConfig, SPINNER, POSITION,PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule  } from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.squareJellyBox,
  fgsPosition: POSITION.centerCenter,
  text : 'Fetching...'
  };

const MaterialComponent=[
  MatButtonModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatProgressBarModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatListModule,
  MatTableModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  NgxUiLoaderHttpModule.forRoot({ showForeground: true,

  }),
]

@NgModule({
  declarations: [],
  imports: [
    MaterialComponent,
  ],
  exports:[
    MaterialComponent,
  ]
})
export class MaterialModule { }
