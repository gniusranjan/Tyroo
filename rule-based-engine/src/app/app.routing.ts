import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';



const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: RulesComponent,
    pathMatch: 'full',
    // children: [
    //   {
    //     path: 'dashboard',
    //     canActivateChild: [AuthGuard],
    //     component: DashboardComponent,
    //     pathMatch: 'full'
    //   }
    // ],
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
