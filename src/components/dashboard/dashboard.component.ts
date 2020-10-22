import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AppContext} from '../../middleware/app.context';
import {MatTableDataSource} from '@angular/material/table';
import {FileInfo, MIME_TYPE_FOLDER} from '../../models/fileInfo';
import {BreadCrumbItem} from '../../models/breadCrumbItem';
import {
  BreadCrumbItemOption,
  OPTION_GET_ALL_SHARABLE_LINKS,
  OPTION_NEW_FOLDER,
  OPTION_UPLOAD_FILES
} from '../../models/breadCrumbItemOption';
import {MatDialog} from '@angular/material/dialog';
import {DialogOneInputComponent} from '../dialogoneinput/dialogoneinput.component';
import {DialogOneInputData} from '../../models/dialogOneInputData';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatSort} from '@angular/material/sort';
import {FilesUploadComponent} from '../filesupload/filesupload.component';
import {DialogShareableLinksComponent} from '../dialogshareablelinks/dialogshareablelinks.component';
import {FileDetails} from '../../middleware/services/file.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  breadCrumbItems: BreadCrumbItem[] = [];
  dataSource: MatTableDataSource<FileInfo> | MatTableDataSource<FileDetails>;
  displayedColumns: string[] = ['icon', 'Name', 'size', 'select', 'delete'];
  files: FileInfo[] = [];

  constructor(
    private appContext: AppContext,
    private bottomSheet: MatBottomSheet,
    private zone: NgZone,
    public dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource(this.files);
    this.appContext.Session.File.uploadFinished.subscribe(() => {
      this.refreshFiles(this.appContext.Session.BreadCrumb.currentItem.Id);
    });
  }

  navigateTo(file: FileInfo) {
    if (file.IsFolder) {
      this.appContext.Repository.File.getFiles(file.Id)
        .subscribe(res => {
          this.zone.run(() => {
            this.files = res;
            this.dataSource = new MatTableDataSource(this.files);
            this.dataSource.sort = this.sort;

            this.appContext.Session.BreadCrumb.navigateTo(file.Id, file.Name);
            this.breadCrumbItems = this.appContext.Session.BreadCrumb.items;
          });
        });
    }
  }

  createNewFolder() {
    const data: DialogOneInputData = new DialogOneInputData();
    data.DefaultInputText = 'New folder';
    data.Title = 'New folder';
    const dialogRef = this.dialog.open(DialogOneInputComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appContext.Repository.File.create(
          this.appContext.Session.BreadCrumb.currentItem.Id,
          result)
          .then((file: FileInfo) => {
            this.appContext.Session.BreadCrumb.navigateTo(file.Id, file.Name);
          });
      }

    });
  }

  delete(file: FileInfo) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
      this.appContext.Repository.File.delete(file.Id)
        .then(() => {
          this.zone.run(() => {
            this.dataSource = new MatTableDataSource(this.files);
            this.dataSource.sort = this.sort;
            console.debug('Deleted successfully');
          });
        });
    }
  }

  select(file: FileInfo) {
    console.debug({'File selected': file});
  }


  ngOnInit(): void {
    this.appContext.Session.BreadCrumb.init();
    this.breadCrumbItems = this.appContext.Session.BreadCrumb.items;
    this.refreshFiles('root');
  }


  onSelectedItemChanged($event: BreadCrumbItem) {
    const fileInfo: FileInfo = new FileInfo();
    fileInfo.Id = $event.Id;
    fileInfo.Name = $event.Name;
    fileInfo.MimeType = MIME_TYPE_FOLDER;
    this.navigateTo(fileInfo);
  }

  onSelectedOptionChanged($event: BreadCrumbItemOption) {
    if ($event.Option === OPTION_NEW_FOLDER) {
      this.createNewFolder();
    } else if ($event.Option === OPTION_UPLOAD_FILES) {
      this.bottomSheet.open(FilesUploadComponent, {data: $event.Data});
    } else if ($event.Option === OPTION_GET_ALL_SHARABLE_LINKS) {
      // this.getAllShareableLinks();
    }
  }

  refreshFiles(folderId: string) {
    this.appContext.Repository.File.getFiles(folderId)
      .subscribe(files => {
        this.zone.run(() => {
          this.files = files;
          this.dataSource = new MatTableDataSource<FileInfo>(this.files);
          this.dataSource.sort = this.sort;
        });
      });
  }

  addComment() {
    const data: DialogOneInputData = new DialogOneInputData();
    data.Title = 'Add Comment';
    const dialog = this.dialog.open(DialogOneInputComponent, {
      width: '500px',
      data
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.files.forEach(file => {
          file.checked = false;
        });
      }
    });
  }
}
