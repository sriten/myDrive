import { Injectable } from '@angular/core';
import { AppSession } from './utils/app.session';
import { AppService } from './services/app.service';

@Injectable()
export class AppContext {

    constructor(
        private appRepository: AppService,
        private appSession: AppSession
    ) {

    }

    get Repository(): AppService {
        return this.appRepository;
    }

    get Session(): AppSession {
        return this.appSession;
    }
}
