import { launchCamera, launchImageLibrary } from 'react-native-image-picker';




export class CameraAdapter {


  static async takePicture(): Promise<string[]> {

    const response = await launchCamera({
      mediaType: "photo",
      quality: 0.7,
      cameraType: 'back',
    });

    if ( response.assets && response.assets[0].uri ) {
      return [response.assets[0].uri];
    }

    return [];

  }


  static async getPicturesFromLibrary():Promise<string[]> {

    const response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      selectionLimit: 10,
    });

    if ( response.assets && response.assets.length > 0 ) {
      return response.assets.map( asset => asset.uri! );
    }



    return [];
  }


}