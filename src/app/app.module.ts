import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
import { HttpClientModule } from '@angular/common/http';
import { QuizSettingsComponent } from './quiz-settings/quiz-settings.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';



const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: () => redirectUnauthorizedTo(['/login'])}
  },
  { path: 'quiz', component: QuizComponent },
  { path: 'quiz-page', component: QuizPageComponent }
];


@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ResetPasswordComponent, UserProfileComponent, QuizSettingsComponent, QuizComponent, QuizPageComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent,QuizComponent]
})
export class AppModule {
}
