export const MIME_TYPE_FOLDER = 'application/vnd.google-apps.folder';

export interface File extends gapi.client.drive.File {
  Comment?: string;
}

export class FileInfo {
  Blob: FileInfo;
  GoogleFile: gapi.client.drive.File;
  Id: string;
  MimeType: string;
  ModifiedTime: Date;
  Name: string;
  Progress: number;
  Shared: boolean;
  Size: string;
  Comment?: string;
  checked?: boolean;

  public get Icon(): string {
    if (this.IsFolder) {
      return 'folder';
    } else {
      return 'insert_drive_file';
    }
  }

  public get IsFolder(): boolean {
    return this.MimeType === MIME_TYPE_FOLDER;
  }

  public get ModifiedTimeText(): string {
    return this.ModifiedTime.getDate() + '.' + (this.ModifiedTime.getMonth() + 1) + '.' + this.ModifiedTime.getFullYear();
  }

  public get SizeText(): string {
    if (!this.Size) {
      return '-';
    }

    // tslint:disable-next-line:radix
    const size: number = parseInt(this.Size);
    if (size < Math.pow(1024, 1)) {
      return size.toString();
    } else if (size < Math.pow(1024, 2)) {
      return Math.floor(size / Math.pow(1024, 1)) + ' KB';
    } else if (size < Math.pow(1024, 3)) {
      return Math.floor(size / Math.pow(1024, 2)) + ' MB';
    } else if (size < Math.pow(1024, 3)) {
      return Math.floor(size / Math.pow(1024, 3)) + ' GB';
    } else {
      return Math.floor(size / Math.pow(1024, 4)) + ' GB';
    }
  }

  static fromGoogleFile(file: File): FileInfo {
    const fileInfo = new FileInfo();
    fileInfo.GoogleFile = file;
    fileInfo.Id = file.id;
    fileInfo.MimeType = file.mimeType;
    fileInfo.ModifiedTime = new Date(file.modifiedTime);
    fileInfo.Name = file.name;
    fileInfo.Shared = file.shared;
    fileInfo.Size = file.size;
    fileInfo.Comment = file.Comment;
    return fileInfo;
  }
}
