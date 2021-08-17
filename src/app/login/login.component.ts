import { CookieService } from 'ngx-cookie-service';
import { GuardGuard } from './../guard.guard';
import { ServisService } from './../servis.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router, private servis:ServisService, private guard: GuardGuard, private cookieService:CookieService) { }
  login = 0;
  user:any;

  ngOnInit(): void {
  }
  registruj = this.fb.group({
    username:'',
    password:'',
    password1:'',
    ime:'',
    prezime:''
  })

  loginUser = this.fb.group({
    username:'',
    password:'',
  })

  loginUserFunkcija()
  {
      this.http.post("http://localhost:8000/api/login", this.loginUser.getRawValue(), {withCredentials:true})
      .subscribe((result:any)=>
        {
          this.cookieService.set('test', result.message);
          this.servis.token = this.cookieService.get('test');
          this.http.get("http://localhost:8000/api/user", {withCredentials:true})
          .subscribe(res=>
            {
                this.user = res;
                console.log(this.user);
                this.servis.user = this.user.role;

            })
            setTimeout(() => {
              this.servis.logovan = 1;
              this.guard.logovan = true;
              this.router.navigate(['dodaj']);
            }, 1000);



        })

  }

  registrujKorisnika()
  {
    if(this.registruj.controls["password"].value == this.registruj.controls["password1"].value )
    {
        this.http.post("http://localhost:8000/api/register", this.registruj.getRawValue(),{withCredentials:true})
        .subscribe(res=>{
          console.log("uspjesno registrovan");

        })
    }else{
      alert("greska");

    }
  }

  prebaciReg()
  {
    this.login= 1;
  }

  prebaciLog()
  {
    this.login=0;
  }

}
