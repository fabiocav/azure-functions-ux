import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {HostEvent} from '../models/host-event'
import { FunctionApp } from './../../shared/function-app';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class HostEventService {

    private eventStream: ReplaySubject<HostEvent>;

    constructor(private _http: Http) {
        this.eventStream = new ReplaySubject<HostEvent>();

        Observable.timer(1, 3000)
            .map((value, index) => new HostEvent( 
              "codediagnostic", value.toString(),
              [{
                  code: "CS000" + index,
                  message: "Some warning here " + value,
                  startColumn: 3,
                  endColumn: 5,
                  startLineNumber: 10,
                  endLineNumber: 10,
                  severity: monaco.Severity.Warning,
                  source: "run.csx"
              },
              {
                  code: "CS000" + index,
                  message: "Some error here " + value,
                  startColumn: 3,
                  endColumn: 5,
                  startLineNumber: 10,
                  endLineNumber: 10,
                  severity: monaco.Severity.Error,
                  source: "run.csx"
              },
              {
                  code: "CS000" + index,
                  message: "Some info here " + value,
                  startColumn: 3,
                  endColumn: 5,
                  startLineNumber: 10,
                  endLineNumber: 10,
                  severity: monaco.Severity.Info,
                  source: "run.csx"
              }]))
            //.concatMap((value, index) => _http.get('https://reddit.com/.json').map(r => r.json()))
            .subscribe(posts => this.eventStream.next({ id: posts.id, name: posts.name, eventData: posts.eventData }));
    }

    get Events() {
        return this.eventStream;
    }

    //  private initLogs(createEmpty: boolean = true, log?: string) {
    //     const maxCharactersInLog = 500000;
    //     const intervalIncreaseThreshold = 1000;
    //     const defaultInterval = 1000;
    //     const maxInterval = 10000;
    //     let oldLogs = '';

    //     var promise = new Promise<string>((resolve, reject) => {

    //         if (this.xhReq) {
    //             this.timeouts.forEach(window.clearTimeout);
    //             this.timeouts = [];
    //             this.log = '';
    //             this.xhReq.abort();
    //             this.oldLength = 0;
    //             if (createEmpty && log) {
    //                 this.log = oldLogs = log;
    //                 this.oldLength = oldLogs.length;
    //                 this.skipLength = 0;
    //             }
    //         }

    //         let url = `${scmUrl}/api/logstream/application/functions/structured}`;
            
    //         this._http.get(url, 

    //         let scmUrl = this.functionInfo.functionApp.getScmUrl();

    //         this.xhReq = new XMLHttpRequest();

    //         this.xhReq.open('GET', url, true);
    //         if (this.functionInfo.functionApp.tryFunctionsScmCreds) {
    //             this.xhReq.setRequestHeader('Authorization', `Basic ${this.functionInfo.functionApp.tryFunctionsScmCreds}`);
    //         } else {
    //             this.xhReq.setRequestHeader('Authorization', `Bearer ${this.token}`);
    //         }
    //         this.xhReq.setRequestHeader('FunctionsPortal', '1');
    //         this.xhReq.send(null);
    //         if (!createEmpty) {
    //             this.functionInfo.functionApp.getOldLogs(this.functionInfo, 10000).subscribe(r => oldLogs = r);
    //         }

    //         var callBack = () => {
    //             var diff = this.xhReq.responseText.length + oldLogs.length - this.oldLength;
    //             if (!this.stopped && diff > 0) {
    //                 resolve(null);
    //                 if (this.xhReq.responseText.length > maxCharactersInLog) {
    //                     this.log = this.xhReq.responseText.substring(this.xhReq.responseText.length - maxCharactersInLog);
    //                 } else {
    //                     this.log = oldLogs
    //                         ? oldLogs + this.xhReq.responseText.substring(this.xhReq.responseText.indexOf('\n') + 1)
    //                         : this.xhReq.responseText;
    //                     if (this.skipLength > 0) {
    //                         this.log = this.log.substring(this.skipLength);
    //                     }
    //                 }

    //                 this.oldLength = this.xhReq.responseText.length + oldLogs.length;
    //                 window.setTimeout(() => {
    //                     var el = document.getElementById('log-stream');
    //                     if (el) {
    //                         el.scrollTop = el.scrollHeight;
    //                     }
    //                 });
    //                 var nextInterval = diff - oldLogs.length > intervalIncreaseThreshold ? this.timerInterval + defaultInterval : this.timerInterval - defaultInterval;
    //                 if (nextInterval < defaultInterval) {
    //                     this.timerInterval = defaultInterval;
    //                 } else if (nextInterval > maxInterval) {
    //                     this.timerInterval = defaultInterval;
    //                 } else {
    //                     this.timerInterval = nextInterval;
    //                 }
    //             } else if (diff == 0) {
    //                 this.timerInterval = defaultInterval;
    //             }
    //             if (this.xhReq.readyState === XMLHttpRequest.DONE) {
    //                 this.initLogs(true, this.log);
    //             } else {
    //                 this.timeouts.push(window.setTimeout(callBack, this.timerInterval));
    //             }
    //         };
    //         callBack();

    //     });

    //     return promise;
    // }
}
