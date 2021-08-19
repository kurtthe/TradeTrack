import * as FileSystem from 'expo-file-system';

export class DownloadFile {
  static instance;

  static getInstance() {
    if (!DownloadFile.instance) {
      DownloadFile.instance = new DownloadFile();
    }
    return DownloadFile.instance;
  }

  createDownload(url, format, callback) {
    return FileSystem.createDownloadResumable(
      url,
      `FileSystem.documentDirectory${format}`,
      {},
      callback
    );
  }

  async download(url, format){
    try {
      const downloadResumable = this.createDownload(url,format, this.progressDownload);
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
    } catch (e) {
      console.log("error download",e);
    }
  }

  progressDownload = (downloadProgress) => {
    return downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  }
}
