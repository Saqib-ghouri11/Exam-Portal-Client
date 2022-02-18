import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LoginService } from 'src/app/services/login/login.service';
import { usernameValidator } from 'src/app/validators/username.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private httpService:HttpService,
              private _snackBar: MatSnackBar,
              private _loginService:LoginService,
              private _router:Router
              ) {
    this.signupForm=new FormGroup({});
   }

   get getUsername(){
     return this.signupForm.get('username');
   }

   get getPassword(){
    return this.signupForm.get('password');
  }
  get getEmail(){
    return this.signupForm.get('email');
  }
   fileToUpload: File | null = null;
  signupForm: FormGroup;

  progress=false;

  handleFileInput(files: FileList | any) {
    this.fileToUpload = files.item(0);
}

onRegister(){
  this.progress=true;
  
  this.httpService.register(this.signupForm.value).subscribe(
    (response:any)=>{
      console.log(response);
      this.progress=false; 
  
        Swal.fire(
          'Congratulations!',
          'You have successfully registered!',
          'success'
        )

        this.signupForm.reset();
        this._router.navigate(['/signin']);
     
    },
    (error:any)=>{
      console.log(error);
      this.progress=false;
      Swal.fire(
        'Registration Failed!',
          ''+error.error.message,
        'error'
      )
    }

  );
  
}
  ngOnInit(): void {
    this.signupForm=this.fb.group({
        username:['',[Validators.required,Validators.minLength(8),usernameValidator]],
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        password:['',[Validators.required,Validators.minLength(8)]],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.minLength(11)]],
        profile:['']
    });
  }

}
