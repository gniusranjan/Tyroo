import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RulesService } from './rules.service';
import {ToastrService} from 'ngx-toastr';
import { Observer } from 'rxjs/Observer';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import * as socketIo from 'socket.io-client';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  public user: any;
  public send: any;
  public obj: any;
  public campaignSet: any;
  public campaignMap: any;
  public campaignList: any;
  public ruleList: any;
  public schedule: any;
  // public date: any;
  // public time: any;
  public switch: Boolean;
  public index: any;
  private cross: any;
  public website: any;
  public serverMessages: any;
  public socket;

  public onMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }
  constructor(private rulesService: RulesService, private toastr: ToastrService) {
    this.socket = socketIo('http://localhost:2000');
    this.socket.on('message', (data) => console.log(data));
    this.onMessage()
      .subscribe((message) => {
        this.toastr.error(message);
        console.log('=====', message);
      });
  }

  ngOnInit() {
    this.campaignSet = new Set();
    console.log('ccheck');
    this.render();
    this.createModal();
    this.switch = true;

  }

  createModal() {
    this.campaignSet = new Set();
    this.switch = true;
    this.schedule = new Date();
    this.obj = {
      Name: '', time: this.schedule.toISOString().split('T')[1].substring(0, 5),
      date: this.schedule.toISOString().split('T')[0], Activated: true, Condition_Type: "condition1", Notify_Action: "24"
    };
  }

  editModal(index) {
    this.switch = false;
    this.index = index;
    console.log("index", this.ruleList[index].Condition_Type);
    this.obj = {
      Name: this.ruleList[index].Name, date: this.ruleList[index].Date_Started.split('T')[0],
      time: this.ruleList[index].Date_Started.split('T')[1].substring(0, 5), Notify_Action: this.ruleList[index].Notify_Action.toString(),
      campaign: this.campaignMap[this.ruleList[index].Campaign_Id], Activated: this.ruleList[index].Activated,
      Condition_Type: this.ruleList[index].Condition_Type
    }
  }


  onChange(campain, event) {
    if (event) {
      this.campaignSet.add(campain);
    }
  }

  async submit() {
    const date = this.obj.date + 'T' + this.obj.time + ':00.004Z';
    const data = {
      User_Id: localStorage.getItem("User_Id"), Activated: this.obj.Activated,Condition_Type: this.obj.Condition_Type,
       Date_Started: new Date(date), Name: this.obj.Name, Notify_Action: Number(this.obj.Notify_Action)
    };
    if (this.switch) {
      this.campaignSet.forEach(camp => {
        data['Campaign_Id'] = camp;
        this.rulesService.createRuleRequest(data).then(res => {
          this.ruleList.push(res.data);
        });
      });
      } else {
        data['Campaign_Id'] = this.ruleList[this.index].Campaign_Id;
        data['_id'] = this.ruleList[this.index]._id;
          await this.rulesService.createRuleRequest(data).then(res => {
              this.ruleList[this.index] = res.data;
          });
        }
    return;
    }

    async render() {
      // debugger
      await this.rulesService.getRequest().then(res => {
        console.log('>>>>', res);
        this.campaignMap = res.data;
        this.campaignList = Object.keys(this.campaignMap);
      });
      await this.rulesService.sendRulesRequest({ User_Id: localStorage.getItem("User_Id") }).then(res => {
        console.log('>>>rules>', res);
        this.ruleList = res.data;
      });

      return;
    }
    //   console.log('>>>>>>>>>>>', reply);
    //   if (reply.error.length) {
    //     alert('unsuccessful');
    //     return;
    //   }
    // }

  }
