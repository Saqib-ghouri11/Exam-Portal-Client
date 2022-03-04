import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LoginService } from 'src/app/services/login/login.service';
import { usernameValidator } from 'src/app/validators/username.validator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private _snackbar:MatSnackBar,
    private router:Router,
    ) {
    this.signinForm=new FormGroup({});
  }


  signinForm:FormGroup

  progress=false;
  get getUsername(){
    return this.signinForm.get('username');
  }

  get getPassword(){
    return this.signinForm.get('password');
  }
  onSignin(){
    this.progress=true;
    //generate token
    this.loginService.generateToken(this.signinForm.value).subscribe(
      (response:any)=>{
       //saving token to local storage
        this.loginService.loginUser(response.token);
        console.log(this.loginService.getToken());

        //saving current user data to local storage
        this.loginService.getCurrentUser().subscribe((user:any)=>{
          this.loginService.setUserDetails(user);
          console.log(user);
          this.progress=false;
          Swal.fire(
            'Congratulation!',
            'You have logged in successfully!',
            'success'
          )
          //redirect if role is ADMIN to admin dashboard
          if(user.authorities[0].authority=='ADMIN'){
            this.router.navigate(['admin-dashboard']);
          }
          //redirect if role is NORMAL to user dashboard
          else if(user.authorities[0].authority=='NORMAL'){
            this.router.navigate(['user-dashboard/'+0]);
          }


        });


      },
      (error:any)=>{
        this.progress=false;
        this._snackbar.open('Something went wrong!','',{
          duration:3000
        });
      }
    );
  }

  ngOnInit(): void {
    this.signinForm=this.fb.group({
      username:['',[Validators.required,usernameValidator,Validators.minLength(8)]],
      password:['',[Validators.required,Validators.minLength(8)]],
    });
  }

}
