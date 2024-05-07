import * as FileSystem from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

export class DownloadFile {
  static instance;

  constructor() {
    this.getToken().then((data) => {
      this.tokeAuth = data;
    });
  }
  
  static getInstance() {
    if (!DownloadFile.instance) {
      DownloadFile.instance = new DownloadFile();
    }
    return DownloadFile.instance;
  }

  createDownload(url, format) {
    return FileSystem.createDownloadResumable(
      url,
      `${FileSystem.documentDirectory}file.${format}`,{
        headers: { 'ttrak-key': this.tokeAuth || '' },
      }
    );
  }

  async download(url, format){
    try {
      const downloadResumable = this.createDownload(url,format);
      const { uri } = await downloadResumable.downloadAsync();
      return uri

    } catch (e) {
      console.log("error download",e);
    }
  }

  progressDownload = (downloadProgress) => {
    return downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  }

  async getToken(){
    const data =  await SecureStore.getItemAsync('data_user');
    const dataParse = JSON.parse(data)
    return dataParse?.api_key
  }
  
}
