import { GuardGuard } from './../guard.guard';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServisService } from './../servis.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private servis:ServisService, private router:Router, private http:HttpClient, private cookieService:CookieService, private guard:GuardGuard) { }
  logovan=this.servis.logovan;
  user:any;
  role = this.servis.user;
  ngOnInit(): void {
    
  }

  logout()
  {
    this.http.post("http://localhost:8000/api/logout", {}, {withCredentials:true})
      .subscribe((result:any)=>
        {
            this.cookieService.deleteAll();
            this.router.navigate(['login']);
            this.guard.logovan = false;
            this.servis.logovan = 0;

        })
  }


}
