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
    // @todo Consider refactoring the .catch() into a catch block - then there's no mixed approach
    let routesList = await axios.get(routesListIndex);
    return routesList.data.routes.map(route => new GpxObject(route));
  }

  static async #loadGpxFile(filename) {
    let xml = await axios.get(filename);
    return new DOMParser().parseFromString(xml.data, "text/xml");
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
    let lastPoint = path[0];
    lastPoint.distance = 0;

    for (const point of path) {
      point.distance = lastPoint.distance + getHaversineDistance(
        lastPoint.lat,
        lastPoint.lon,
        point.lat,
        point.lon
      )
      lastPoint = point;
    }
    return path;
  }
}
