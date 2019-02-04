import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
@Injectable()
export class RulesService implements OnInit {
    public feed: any;
    constructor(private http: HttpClient) { }
    ngOnInit() {   }

    // putRequest(data) {
    //     return this.http.put('http://localhost:2000/pages/update', data) ;
    // }

    // getRequest () {
    //     return this.http.get('http://localhost:2000/pages/getall').toPromise().then(response => response) ;
    // }

    // getoneRequest(data) {
    //     return this.http.get('http://localhost:2000/pages/getone/' + data ).toPromise().then(response => response);

    // }

    // deleteRequest(data) {
    //     return this.http.delete('http://localhost:2000/pages/delete/' + data ).toPromise().then(response => response) ;
    // }

    sendRulesRequest(data) {
        return this.http.post('http://localhost:2000/sendRules' , data ).toPromise().then(resp => resp) ;
    }

    createRuleRequest(data) {
        return this.http.post('http://localhost:2000/createRule' , data ).toPromise().then(resp => resp) ;
    }

    getRequest() {
        return this.http.get('http://localhost:2000/sendCampaign'  ).toPromise().then(res => res) ;
    }
}
