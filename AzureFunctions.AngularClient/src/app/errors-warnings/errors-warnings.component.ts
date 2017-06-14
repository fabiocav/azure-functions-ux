import {Component, OnDestroy, Input, Inject, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {TranslatePipe} from '@ngx-translate/core';
import {Diagnostic} from "./diagnostic"
import { FunctionInfo } from '../shared/models/function-info';
import {UserService} from '../shared/services/user.service';
import {FunctionContainer} from '../shared/models/function-container';
import {FunctionsService} from '../shared/services/functions.service';
import {BroadcastService} from '../shared/services/broadcast.service';
import {BroadcastEvent} from '../shared/models/broadcast-event'
import {ErrorEvent} from '../shared/models/error-event';
import {UtilitiesService} from '../shared/services/utilities.service';
import {GlobalStateService} from '../shared/services/global-state.service';
import { Observable } from 'rxjs/Observable';
import {HostEventService} from '../shared/services/host-event.service'
import {HostEvent} from '../shared/models/host-event'

@Component({
    selector: 'errors-warnings',
    templateUrl: './errors-warnings.component.html',
    styleUrls: ['./errors-warnings.component.scss', '../function-dev/function-dev.component.scss']
})
export class ErrorsWarningsComponent implements OnDestroy {
    public diagnostics : any[] = [];
    private token: string;
    private tokenSubscription: Subscription;
    private hostEventSubscription: Subscription;
    private skipLength: number = 0;
    @Input() functionInfo: FunctionInfo;
    @Output() closeClicked = new EventEmitter<any>();
    @Output() expandClicked = new EventEmitter<boolean>();

    constructor(
        private _hostEventService: HostEventService,
        private _userService: UserService,
        private _broadcastService: BroadcastService,
        private _globalStateService: GlobalStateService) {
        this.tokenSubscription = this._userService.getStartupInfo().subscribe(s => this.token = s.token);
        this.hostEventSubscription = this._hostEventService.Events.subscribe((r) => { this.diagnostics = r.eventData; });
    }

    ngOnDestroy() {
        if (this.tokenSubscription) {
            this.tokenSubscription.unsubscribe();
            delete this.tokenSubscription;
        }

        if (this.hostEventSubscription) {
            this.hostEventSubscription.unsubscribe();
            delete this.hostEventSubscription;
        }
    }

    close() {
        this.closeClicked.emit(null);
    }

    private getSeverityClass(severity : monaco.Severity){
        var result : string;
        switch (severity) {
            case monaco.Severity.Error:
                result = "fa-times-circle severityerror";
                break;
            case monaco.Severity.Warning:
                result = "fa-exclamation-triangle severitywarning";
                break;
            case monaco.Severity.Warning:
                result = "fa-info-circle severitywarning";
                break;
        }

        return "fa severitycolumn " + result;
    }
}
