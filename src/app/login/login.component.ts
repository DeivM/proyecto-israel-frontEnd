import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { modules } from '../shared/confi/confi';
import { JwtAuthService } from '../shared/services/auth/jwt-auth.service';
import { HttpService } from '../shared/services/http.service';
import { whiteSpaceValidator } from '../shared/validators/whiteSpaceValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
  msg = '';
  signinForm: UntypedFormGroup;
  itemsEmpresa: any[] = [];
  itemsSub: Subscription = new Subscription();
  empresa:any;
  dbName:string="";
  @ViewChild('buttonLogin') buttonLogin: ElementRef;
  constructor( private router: Router,
    private jwtAuth: JwtAuthService,
    private httpService: HttpService,) 
  { 
    this.signinForm = new UntypedFormGroup({
      usuEmail: new UntypedFormControl('', [Validators.required, whiteSpaceValidator.cannotContainSpace, Validators.email]),
      usuPassword: new UntypedFormControl('', [Validators.required, whiteSpaceValidator.cannotContainSpace,]),
    });

  }
  ngOnInit(): void {
  
  }
  
  ngOnDestroy(): void {
    this.itemsSub.unsubscribe();
  }
 
  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  
  signin() {
    const signinData = this.signinForm.value
    this.jwtAuth.signin(signinData.usuEmail, signinData.usuPassword)
    .subscribe(response => {
      this.jwtAuth.ValidateUrl()
    }, err => {
      this.msg = err.error;
    })
  }

 
 
}
