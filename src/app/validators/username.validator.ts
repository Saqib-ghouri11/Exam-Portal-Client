import { AbstractControl, PatternValidator } from "@angular/forms";

export function usernameValidator(control:AbstractControl):{[key:string]:boolean}|null{
    const username=control.value;
    const pattern:any=/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if(pattern.test(username) || username==''){
       return null;
    }
    
    return   {usernameInValid:true};
}