export default class GpxObject {
  static #loadGpxFile(filename) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', filename);
      xhr.send();
      xhr.onload = function() {
        if (this.status == 200) {
          resolve(xhr.responseXML);
        }
        else {
          reject(this);
        }
      };
    });
  }

  static #parseGpx(gpx) {
    // @todo This should probably be written more neatly, potentially use a 3rd party xml parser
    var trkPts = gpx.evaluate('//df:trkseg/*', gpx, function(prefix) { if (prefix === "df") return "http://www.topografix.com/GPX/1/1"; }, XPathResult.ANY_TYPE, null);
    let path = [];

    let trkPt;
    while (trkPt = trkPts.iterateNext()) {
      path.push(
        {
          lat: Number.parseFloat(trkPt.attributes['lat'].value),
          lon: Number.parseFloat(trkPt.attributes['lon'].value),
          ele: Number.parseFloat(trkPt.getElementsByTagName('ele')[0].textContent)
        }
      );
    }
    return path;
  }


  static async loadFromFile(filename) {
    let gpxDocument = await this.#loadGpxFile(filename);
    return this.#parseGpx(gpxDocument);
  }
}