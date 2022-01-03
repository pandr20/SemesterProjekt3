import IAdAPI from "./IAdAPI";

class AdAPI implements IAdAPI {
  //Our url: https://express-server-react-native.herokuapp.com
  //Our extention: /adsvisual
  //ads team: coreos.stream.stud-srv.sdu.dk
  //ads extention: /image
  url = "https://express-server-react-native.herokuapp.com";
  path = "/adsvisual";

  defaultImageUrl = ""; // set a default image here.

  // Singleton
  private static instance: IAdAPI | null;

  private constructor() {}

  static getInstance() {
    if (this.instance == null) {
      this.instance = new AdAPI();
    }
    return this.instance;
  }

  getVisualAd(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      fetch(this.url + this.path)
        .then((response) => response.json())
        .then((json) => {
          console.log("ID: " + json.adsVisual[0]._id);
          console.log("Url: " + json.adsVisual[0].imageUrl);
          resolve(json.adsVisual[0].imageUrl);
        })
        .catch((error) => {
          console.log(error);
          console.log("     Using default image");
          reject(
            "https://www.absolut-venezuela.com/wp-content/uploads/2021/04/7.jpg"
          );
        });
    });
  }
}

export default AdAPI;
