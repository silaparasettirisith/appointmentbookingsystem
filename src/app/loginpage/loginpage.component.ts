import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  error='';

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  Login(f:NgForm)
  {
    this.http.post('http://localhost:3000/validate-user',[f.value.email,f.value.password])
    .subscribe((result)=>
    {
      if(result==1)
      {
        console.log("Sucess")
        localStorage.setItem('studentid',f.value.email)
        this.router.navigate(['/homepage'])
      }
      else
      {
        this.error="Invalid Username and password"
        f.resetForm()
        
      }
    })
  }
}
