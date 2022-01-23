import axios from "axios";
import { getHaversineDistance } from "../helpers/gps";

const routesListIndex = "../src/routes/route_index.json";

export default class GpxObject {

  // @todo Move calculating distance to the constructor method from parseGpx
  constructor({title, gpx, distance, elevationGain, speedIndex, climbIndex, description, isDefault}) {
    this.title = title;
    this.gpx = gpx;
    this.distance = distance;
    this.elevationGain = elevationGain;
    this.speedIndex = speedIndex;
    this.climbIndex = climbIndex;
    this.description = description;
    this.isDefault = isDefault ?? false;
  }

  async getRoute() {
    if (this.route == null) {
      let gpxFile = await GpxObject.#loadGpxFile(this.gpx);
      this.route = GpxObject.#calculateCummulativeDistance(GpxObject.#parseGpx(gpxFile));
    }
    return this.route;
  }

  static async loadRoutesList() {
    let routesList = await axios.get(routesListIndex).catch(e => console.error(`load routes list error: ${e}`));
    console.log(routesList.data);
    return routesList.data.routes.map(route => new GpxObject(route));
  }

  static async loadFromJson(filepath) {
    return await new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', filepath);
      xhr.send();
      xhr.onload = async function() {
        if (this.status == 200) {
          let routeJson = JSON.parse(xhr.responseText);
          resolve(new GpxObject(routeJson));
        }
        else {
          reject(this);
        }
      };
    });
  }

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
      let currentPoint = {
        lat: Number.parseFloat(trkPt.attributes['lat'].value),
        lon: Number.parseFloat(trkPt.attributes['lon'].value),
        ele: Number.parseFloat(trkPt.getElementsByTagName('ele')[0].textContent)
      };
      path.push(
        currentPoint
      );
    }
    return path;
  }

  static #calculateCummulativeDistance(path) {
    path[0].distance = 0;
    for (let i = 1; i < path.length; i++) {
      path[i].distance = path[i - 1].distance + getHaversineDistance(
        path[i - 1].lat,
        path[i - 1].lon,
        path[i].lat,
        path[i].lon
      );
    }
    return path;
  }
}
