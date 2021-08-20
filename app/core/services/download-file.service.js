import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

export class DownloadFile {
  static instance;

  static getInstance() {
    if (!DownloadFile.instance) {
      DownloadFile.instance = new DownloadFile();
    }
    return DownloadFile.instance;
  }

  createDownload(url, format) {
    return FileSystem.createDownloadResumable(
      url,
      `${FileSystem.documentDirectory}file.${format}`
    );
  }

  async download(url, format){
    try {
      const downloadResumable = this.createDownload(url,format);
      const { uri } = await downloadResumable.downloadAsync();
      if(await Sharing.isAvailableAsync()){
        await Sharing.shareAsync(uri);
      }

    } catch (e) {
      console.log("error download",e);
    }
  }

  progressDownload = (downloadProgress) => {
    return downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  }
}
