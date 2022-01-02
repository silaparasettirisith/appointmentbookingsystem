import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  Register(form:NgForm)
  {
    this.http.post('http://localhost:3000/register',form.value)
    .subscribe((result)=>
    {
      this.router.navigate(['/'])
    },(error)=>
    {
      console.log(error)
    })

    
    
  }
}
