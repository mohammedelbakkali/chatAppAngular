import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component {
  form: FormGroup;
  private connection: HubConnection;


   
   constructor(private fb: FormBuilder, private router: Router){
    this.connection = new HubConnectionBuilder()
    .withUrl('https://localhost:7084/chat')
    .build();

    this.form = this.fb.group({
      username:""
    });
   }

   getData(){ 
       this.router.navigate(['/home' , this.form.value.username])
   }
}
