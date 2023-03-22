import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignCreateComponent } from './campaign-create/campaign-create.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';

const routes: Routes = [
  { path: 'campaigns/create',canActivate: [AuthGuard], component: CampaignCreateComponent },
  { path: 'campaigns/:id',canActivate: [AuthGuard], component: CampaignDetailComponent},
  { path: 'campaigns',canActivate: [AuthGuard], component: CampaignListComponent },
  { path: 'settings',canActivate: [AuthGuard], component: SettingsComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'resetPassword', component:ResetPasswordComponent},
  { path: 'resetPasswordForm', component:ResetPasswordFormComponent},
  { path: 'newUser',component: NewUserComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  //imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
