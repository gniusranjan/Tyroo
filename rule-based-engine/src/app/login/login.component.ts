import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: any;
  public enter: boolean;
  public User_Id: any;
  constructor(private loginService: LoginService, private router: Router, private authService: AuthGuard) {
    this.router.navigate(['']);
   }

  ngOnInit() {
    this.enter = false;
    this.router.navigate(['']);
    this.user = {email : '', password: ''};
  }
  async submit() {
    // console.log(this.user);
    if (!this.user.email.trim() || !this.user.password.trim()) {
       alert('invalid email and password combination');
       return;
    }
    const reply = await this.loginService.postRequest(this.user).then(res => res);
    console.log('>>>>>>>>>>>', reply);
    if(reply.error.length){
      alert('unsuccessful');
      return;
    }
    localStorage.setItem("User_Id", reply.data._id );
    this.authService.enter = true;
    this.router.navigate(['app']);
  }


}
