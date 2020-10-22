import {Injectable} from '@angular/core';
import {FileInfo, MIME_TYPE_FOLDER} from '../../models/fileInfo';
import {from, Observable} from 'rxjs';

export class FileDetails {
  file: FileInfo;
  comments: gapi.client.drive.Comment[];
}

class Comment {
  content: string;
}

@Injectable()
export class FileService {


  create(parentId: string, folderName: string) {
    const folder = {
      name: folderName,
      mimeType: MIME_TYPE_FOLDER,
      parents: [parentId]
    };
    return gapi.client.drive.files.create({
      resource: folder,
      fields: 'id, name, mimeType, modifiedTime, size'
    }).then((res) => {
      return FileInfo.fromGoogleFile(res.result);
    });
  }

  delete(fileId: string) {
    return gapi.client.drive.files.delete({
      fileId
    });
  }

  getFiles(folderId: string): Observable<FileInfo[]> {
    const promise = gapi.client.drive.files.list({
      pageSize: 100,
      fields: 'nextPageToken, files(id, name, mimeType, size, shared)',
      q: `'${folderId}' in parents and trashed = false`,
      orderBy: 'name',
    })
      .then((res) => {
        const files: FileInfo[] = [];
        res.result.files.forEach((file) => files.push(FileInfo.fromGoogleFile(file)));

        return files;
      });
    return from(promise);
  }

  importFile(parentId: string, name: string, blob: Blob) {
    const boundary = 'root';
    const delimiter = '\r\n--' + boundary + '\r\n';
    const closeDelim = '\r\n--' + boundary + '--';

    const reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onload = e => {
      const contentType = blob.type || 'application/octet-stream';
      const metadata = {
        name,
        mimeType: contentType,
        parents: [parentId]
      };

      const base64Data = btoa(reader.result.toString());
      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        closeDelim;

      return gapi.client.request({
        path: '/upload/drive/v3/files',
        method: 'POST',
        params: {uploadType: 'multipart'},
        headers: {
          'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        body: multipartRequestBody
      });
    };
  }
}
