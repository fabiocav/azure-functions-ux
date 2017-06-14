import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {HostEvent} from '../models/host-event'
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class HostEventService {

    private eventStream: ReplaySubject<HostEvent>;

    constructor(private _http: Http) {
        this.eventStream = new ReplaySubject<HostEvent>();

        Observable.timer(1, 3000)
            .map((value, index) => new HostEvent( 
              "diagnostic", value.toString(),
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
}
