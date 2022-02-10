import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
import { usernameValidator } from 'src/app/validators/username.validator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb:FormBuilder,private httpService:HttpService,private _snackbar:MatSnackBar) { 
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
    this.httpService.login(this.signinForm).subscribe(
      response=>{
        this.progress=false;
        Swal.fire(
          'Congratulation!',
          'You have logged in successfully!',
          'success'
        )
      },
      error=>{
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
