import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css','../../../styles.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  loginSer=this.loginService;

  onLogout(){
    this.loginService.logout();
    window.location.reload();
  }
  userLogin(){
    if(this.loginService.isUserLogin()){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit(): void {
  }

}
