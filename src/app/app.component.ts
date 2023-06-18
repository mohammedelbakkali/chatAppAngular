import { DatePipe } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewChecked{
  id$!: Observable<string>;
  chat!: any;
  currentUser = '';
  form: FormGroup;

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  private connection: HubConnection;
  public messages: string[] = [];
  public user: string = "";
  public message: string = "";
  public message$!: Observable<string>;
  private unsubscribe$ = new Subject<void>();
  public valuemessage:string="";
  

 

 generateUniqueId(): string {
  return Date.now().toString();
}


  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.currentUser = this.generateUniqueId();
    this.connection = new HubConnectionBuilder()
    .withUrl('https://localhost:7084/chat')
    .build();

    this.form = this.fb.group({
      input: "",
      username:""
    });
  }

  ngOnInit() {
    this.id$ = this.route.params.pipe(map(p => p['id']));
    this.chat = CHAT;

    this.connection.start()
    .then(() => {
      console.log('Connected to SignalR hub');
      this.connection.on('ReceiveMessage', (user, message) => {
        const currentTime: Date = new Date();
        
        const ReceiveMessage = {
      
          sendUser: user,
          text: message,
          ts: currentTime
  
      }

       console.log(`user: ${user}`)
       console.log(`currentUser: ${this.currentUser}`)


           if(user != this.currentUser){
              this.chat.data.push(ReceiveMessage);
           }
         

        this.messages.push(`${user}: ${message}`);
      });
    })
    .catch((error) => {
      console.error('Failed to connect to SignalR hub', error);
    });

  this.message$ = new Observable<string>((observer) => {
    return () => {
      this.connection.off('ReceiveMessage');
      this.connection.stop();
    };
  }).pipe(
    takeUntil(this.unsubscribe$)
  );

  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async sendMessage() {
    if (!this.user || !this.message) return;
    await this.connection.invoke('SendMessage', this.currentUser, this.message);
    this.message = '';
  }


  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async onSubmit() {
    const currentTime: Date = new Date();
const hours: number = currentTime.getHours();
const minutes: number = currentTime.getMinutes();
const seconds: number = currentTime.getSeconds();

console.log(`Current time: ${hours}:${minutes}:${seconds}`);

    const message = {
      
        sendUser:this.currentUser,
        text: this.form.value.input,
        ts: currentTime

    }
    await this.connection.invoke('SendMessage', this.currentUser, message.text);

    this.chat.data.push(message);
    this.valuemessage ="";

    console.log(this.chat)
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}


const CHAT = {
  id: '0',
  data: [
   
  ]
};

class Chat {
  id!: string;
  data!: Message[];
}

class Message {
  sendUser!: string;
  text!: string;
  ts!: number;
}
