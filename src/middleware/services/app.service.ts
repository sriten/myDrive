import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { FileService } from './file.service';

@Injectable()
export class AppService {
    constructor(
        private fileRepository: FileService,
        private userRepository: UserService
    ) {

    }
    get File(): FileService {
        return this.fileRepository;
    }
    get User(): UserService {
        return this.userRepository;
    }
}
