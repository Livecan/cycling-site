export function getHaversineDistance(latitude1, longitude1, latitude2, longitude2) {
  var R = 6371; // Radius of the Earth in kilometers
  var rlat1 = latitude1 * (Math.PI/180); // Convert degrees to radians
  var rlat2 = latitude2 * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (longitude2 - longitude1) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}
