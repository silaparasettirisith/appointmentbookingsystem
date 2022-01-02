import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-detailpage',
  templateUrl: './detailpage.component.html',
  styleUrls: ['./detailpage.component.css']
})
export class DetailpageComponent implements OnInit {
  display=1;
  fer:any
  slots=[0,0,0,0,0,0,0,0,0,0,0,0,0]
  doctors=[]
  slotbooked=1
  doctorbooked='';
  doctorslot=0;
  selectedItems=[]
  bookinghistory:any

  dropdownSettings:IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };
  slotindex: any;
  studentsbooking=[];

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.display=1;
    this.slots=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.doctors=[]
    this.slotbooked=1
    this.doctorbooked='';
    this.doctorslot=0;
    this.selectedItems=[]

    this.studentsbooking=[];

    this.doctors=[]
    this.http.get('http://localhost:3000/doctors')
    .subscribe((result)=>
    {
      console.log(result)
      for(let i=0;i<result[0].length;i++)
      {
        this.doctors.push({'id':result[0][i].id,'name':result[0][i].name+'-'+result[0][i].specialization+'       '})
      }
      console.log(this.doctors)
    },(error)=>
    {
      console.log(error)
    })

    


    this.http.get('http://localhost:3000/bookinghistory')
    .subscribe((result)=>
    {
      this.bookinghistory=result 
      this.studentsbooking=[]
      for(let i=0;i<this.bookinghistory[0].length;i++)
      {
        if(this.bookinghistory[0][i].studentid==localStorage.getItem('studentid'))
        {
          this.studentsbooking.push(this.bookinghistory[0][i])
        }
      }
      console.log(this.bookinghistory)
    },(error)=>
    {
      console.log(error)
    })



  }
  goto(type:any)
  {
    this.display=type
  }
  adddoctor(f:NgForm)
  {
    console.log(f.value,localStorage.getItem('studentid'))
    f.value['studentid']=localStorage.getItem('studentid')
    console.log(f.value)
    this.http.post('http://localhost:3000/add-doctor',f.value)
    .subscribe((result)=>
    {
      f.resetForm()
      this.router.navigate(['/detailpage'])
    },(error)=>
    {
      console.log(error)
    })

  }
  setslot(index:any)
  {
    this.slots[index]=this.slots[index]==0?1:0
    this.slotindex=index
    this.doctorslot=this.slots[index]
    console.log(this.doctorslot,this.doctorbooked,this.slotbooked,this.fer)
    if(this.doctorbooked.length!=0 && this.doctorslot==1)
    {
      this.slotbooked=0
    }
    else
    {
      this.slotbooked=1
    }
  }

  onItemSelect(item: any) {
    this.doctorbooked=item

    this.slots=[0,0,0,0,0,0,0,0,0,0,0,0,0]
    var doctorname=item.name.split('-')[0]
    
    var todayDate=moment().format('YYYY-MM-DD')

    for(let i=0;i<this.bookinghistory[0].length;i++)
    {
      console.log(doctorname,this.bookinghistory[0][i])
      if(doctorname==this.bookinghistory[0][i].doctorname)
      {
        this.slots[this.bookinghistory[0][i].slot]=-1
      }
    }
    console.log(this.slots)


  }
  onSelectAll(items: any) {

  }
  onDeSelect(item:any)
  {
    this.doctorbooked=''
    if(this.doctorbooked.length!=0 && this.doctorslot==1)
    {
      this.slotbooked=0
    }
    else
    {
      this.slotbooked=1
    }

  }

  clickdoctorbooked()
  {
    console.log(this.slotindex,this.doctorbooked,localStorage.getItem('studentid'))

    var f=this.doctorbooked['name'].split('-')
    var doctorname=f[0].trim()
    var doctorspecialization=f[1].trim()
    console.log(doctorname,doctorspecialization)
    var todayDate=moment().format('YYYY-MM-DD')
    var s={name:doctorname,doctorspec:doctorspecialization,studentid:localStorage.getItem('studentid'),slot:this.slotindex,date:todayDate}

    this.http.post('http://localhost:3000/booking',s)
    .subscribe((result)=>
    {
      this.display=3
      this.ngOnInit()
    }
    ,(error)=>
    {
      console.log(error)
    })
  }
  p()
  {
    console.log("default")
  }

}
