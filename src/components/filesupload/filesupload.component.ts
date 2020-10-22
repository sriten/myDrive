import { Component, OnInit, Inject, EventEmitter, NgZone, ChangeDetectorRef } from "@angular/core";
import { AppContext } from "../../middleware/app.context";
import { FileInfo } from "../../models/fileInfo";
import { MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'file-upload',
    templateUrl: './filesupload.component.html',
    styleUrls: ['./filesupload.component.css']
})
export class FilesUploadComponent implements OnInit {
    files: FileInfo[] = [];
    currentFile: FileInfo;
    errorMessage: string;
    currentIndex = -1;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public fileList: FileList,
        private appContext: AppContext,
        private ref: ChangeDetectorRef,
        private zone: NgZone,
    ) {
        this.files = [];
      // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < fileList.length; i++) {
            const fileInfo = new FileInfo();
            fileInfo.Name = fileList[i].name;
            // fileInfo.Blob = fileList[i];
            this.files.push(fileInfo);
        }

    }

    nextFile() {
        this.currentIndex++;
        if (this.currentIndex <= this.files.length - 1) {
            return this.files[this.currentIndex];
        }

    }

    ngOnInit(): void {
        this.uploadNextFile();
    }

    private uploadNextFile() {
        this.currentFile = this.nextFile();
        // if (this.currentFile)
        //     // this.uploadCurrentFile();
        // else {
        //
        // }
    }

    // uploadCurrentFile() {
    //     this.currentFile.Progress = 10;
    //     // @ts-ignore
    //     this.appContext.Repository.File.importFile(
    //         this.appContext.Session.BreadCrumb.currentItem.Id,
    //         this.currentFile,
    //         (res) => this.onImportError(res),
    //         (res) => this.onImportComplete(res),
    //         (res) => this.onImportProgress(res)
    //     );
    // }

    onImportError(res) {
        console.debug(res);
        this.errorMessage = res;
    }

    onImportComplete(res) {
        this.currentFile.Progress = 100;
        this.uploadNextFile();
        this.appContext.Session.File.uploadFinished.emit();
    }

    onImportProgress(event: any) {
        this.currentFile.Progress = (event.loaded / event.total) * 100;
        this.ref.detectChanges();
    }

    increase() {
        this.files[0].Progress -= 10;
    }


}
