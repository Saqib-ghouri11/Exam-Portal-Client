import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from 'src/app/services/http.service';
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
              private _snackBar: MatSnackBar
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
    response=>{
      console.log(response);
      this.progress=false;
      if(response==null){
        
        this._snackBar.open('User Already Exist','OK');
        this.signupForm.reset();
      }else{
        Swal.fire(
          'Congratulations!',
          'You have successfully registered!',
          'success'
        )
        this.signupForm.reset();
      // this._snackBar.open('User Registered Successfully','OK');
      }
    },
    error=>{
      console.log(error);
      this.progress=false;
      this._snackBar.open('Registration Failed','OK');
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
